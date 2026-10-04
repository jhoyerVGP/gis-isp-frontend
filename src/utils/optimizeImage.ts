// src/utils/optimizeImage.ts

export type OutputFormat =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/svg+xml";

export interface OptimizeImageOptions {
  /** Ancho máximo en px. Por defecto: 512 */
  maxWidth?: number;
  /** Alto máximo en px. Por defecto: 512 */
  maxHeight?: number;
  /** Calidad de compresión (0–1). Ignorado en PNG y SVG. Por defecto: 0.8 */
  quality?: number;
  /**
   * Formato de salida. Por defecto: "image/jpeg".
   * - "image/webp": mejor compresión, amplio soporte.
   * - "image/svg+xml": envuelve la imagen raster en un SVG (no vectoriza).
   */
  format?: OutputFormat;
  /** Si es true, recorta en cuadrado centrado usando el lado menor. Por defecto: false */
  square?: boolean;
  /** Peso máximo permitido en bytes. Ignorado en SVG. Por defecto: 500 KB */
  maxSizeBytes?: number;
  /** Si es true, rellena fondo blanco al convertir a formatos sin alfa. Por defecto: true */
  fillWhiteBackground?: boolean;
}

export interface OptimizedImageResult {
  /** Archivo optimizado listo para subir */
  file: File;
  /** URL local (blob) para previsualizar. Recuerda hacer URL.revokeObjectURL */
  previewUrl: string;
  /** Ancho final en px */
  width: number;
  /** Alto final en px */
  height: number;
  /** Peso final en bytes */
  size: number;
  /** Formato final aplicado */
  format: OutputFormat;
}

/**
 * Optimiza una imagen usando canvas: redimensiona, recorta (opcional)
 * y comprime. Soporta salida JPEG, PNG, WebP y SVG (envoltura).
 */
export async function optimizeImage(
  file: File,
  options: OptimizeImageOptions = {},
): Promise<OptimizedImageResult> {
  const {
    maxWidth = 512,
    maxHeight = 512,
    quality = 0.8,
    format = "image/jpeg",
    square = false,
    maxSizeBytes = 500 * 1024,
    fillWhiteBackground = true,
  } = options;

  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo no es una imagen válida.");
  }

  // 1. Cargar la imagen original
  const image = await loadImage(file);

  // 2. Calcular dimensiones finales
  const { width, height } = calculateDimensions(
    image.width,
    image.height,
    maxWidth,
    maxHeight,
    square,
  );

  // 3. Dibujar en canvas
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo obtener el contexto del canvas.");

  const needsSolidBackground = format === "image/jpeg";
  if (needsSolidBackground && fillWhiteBackground) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, 0, 0, width, height);

  // 4. Generar el blob según formato
  let blob: Blob;
  let extension: string;

  if (format === "image/svg+xml") {
    blob = await canvasToSvgBlob(canvas);
    extension = "svg";
  } else {
    blob = await canvasToBlob(canvas, format, quality, maxSizeBytes);
    extension = mimeToExtension(format);
  }

  // 5. Construir File y preview URL
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const optimizedFile = new File([blob], `${baseName}.${extension}`, {
    type: format,
    lastModified: Date.now(),
  });

  const previewUrl = URL.createObjectURL(optimizedFile);

  return {
    file: optimizedFile,
    previewUrl,
    width,
    height,
    size: optimizedFile.size,
    format,
  };
}

/* ------------------------- Helpers internos ------------------------- */

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo cargar la imagen."));
    };
    img.src = url;
  });
}

function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
  square: boolean,
) {
  if (square) {
    const side = Math.min(originalWidth, originalHeight);
    const finalSide = Math.min(side, maxWidth, maxHeight);
    return { width: finalSide, height: finalSide };
  }

  let width = originalWidth;
  let height = originalHeight;

  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }

  return { width: Math.round(width), height: Math.round(height) };
}

function mimeToExtension(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/svg+xml":
      return "svg";
    default:
      return "bin";
  }
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  initialQuality: number,
  maxSizeBytes: number,
): Promise<Blob> {
  let quality = initialQuality;
  let blob = await toBlob(canvas, mimeType, quality);

  while (blob.size > maxSizeBytes && quality > 0.3) {
    quality -= 0.1;
    blob = await toBlob(canvas, mimeType, quality);
  }

  if (blob.size > maxSizeBytes) {
    const scaledCanvas = document.createElement("canvas");
    scaledCanvas.width = Math.round(canvas.width * 0.8);
    scaledCanvas.height = Math.round(canvas.height * 0.8);
    const sctx = scaledCanvas.getContext("2d");
    if (sctx) {
      sctx.imageSmoothingEnabled = true;
      sctx.imageSmoothingQuality = "high";
      sctx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);
      blob = await canvasToBlob(
        scaledCanvas,
        mimeType,
        initialQuality,
        maxSizeBytes,
      );
    }
  }

  return blob;
}

function toBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(
            new Error(`No se pudo generar el blob en formato ${mimeType}.`),
          );
          return;
        }
        resolve(blob);
      },
      mimeType,
      quality,
    );
  });
}

/**
 * Envuelve la imagen raster en un SVG válido con la imagen embebida en base64.
 * ⚠️ No vectoriza: solo encapsula. El peso suele ser mayor que el original.
 */
async function canvasToSvgBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  const pngBlob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => {
      if (!b) {
        reject(new Error("No se pudo generar el PNG intermedio para SVG."));
        return;
      }
      resolve(b);
    }, "image/png");
  });

  const base64 = await blobToBase64(pngBlob);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${canvas.width}" height="${canvas.height}"
     viewBox="0 0 ${canvas.width} ${canvas.height}">
  <image width="${canvas.width}" height="${canvas.height}"
         xlink:href="${base64}" href="${base64}" />
</svg>`;

  return new Blob([svg], { type: "image/svg+xml" });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("No se pudo convertir el blob a base64."));
        return;
      }
      resolve(result);
    };
    reader.onerror = () => reject(new Error("Error leyendo el blob."));
    reader.readAsDataURL(blob);
  });
}
