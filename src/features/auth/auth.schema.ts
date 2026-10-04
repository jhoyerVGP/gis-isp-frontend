import { z } from "zod";

// Types for Login 
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "El nombre de usuario es obligatorio" }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Types for Two-Factor Authentication
export const twoFactorSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, {
      message: "Ingresa tu código de autenticación",
    })
    .max(20, {
      message: "El código no es válido",
    }),
});

export type TwoFactorInput = z.infer<typeof twoFactorSchema>;
