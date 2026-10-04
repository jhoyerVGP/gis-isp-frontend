import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Copy, Download, Check } from "lucide-react";

interface Props {
  codes: string[];
  onFinish: () => void;
}

export function BackupCodesView({ codes, onFinish }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(codes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [`Códigos de recuperación 2FA:\n\n${codes.join("\n")}`],
      {
        type: "text/plain",
      },
    );
    element.href = URL.createObjectURL(file);
    element.download = "gis_isp_2fa_recovery_codes.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-4 rounded-md border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-900/50 dark:bg-amber-900/10">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 text-amber-600" />
        <div>
          <h3 className="font-medium text-amber-800 dark:text-amber-500">
            Guarda tus códigos de recuperación
          </h3>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
            Estos códigos son la única forma de acceder a tu cuenta si pierdes
            tu dispositivo. Guárdalos en un lugar seguro.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 font-mono text-sm sm:grid-cols-3 md:grid-cols-4">
        {codes.map((c) => (
          <div
            key={c}
            className="flex items-center justify-center rounded bg-background py-2 tracking-widest shadow-sm border"
          >
            {c}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyAll}>
            {copied ? (
              <Check className="mr-2 size-4" />
            ) : (
              <Copy className="mr-2 size-4" />
            )}
            Copiar todos
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 size-4" />
            Descargar .txt
          </Button>
        </div>
        <Button onClick={onFinish}>He guardado mis códigos</Button>
      </div>
    </div>
  );
}
