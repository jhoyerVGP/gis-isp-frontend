import { z } from "zod";

// Personal information
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(100, "Máximo 100 caracteres"),
  lastName: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(100, "Máximo 100 caracteres"),
  phone: z
    .string()
    .regex(/^[0-9+\s()-]{7,20}$/, "Teléfono inválido")
    .optional()
    .or(z.literal("")),
  ci: z
    .string()
    .regex(/^[0-9A-Za-z-]{5,20}$/, "CI inválido")
    .optional()
    .or(z.literal("")),
});

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;

// Username
export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "El nombre de usuario es obligatorio")
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .regex(
      /^[A-Za-z0-9._-]+$/,
      "Solo se permiten letras, números, punto, guion y guion bajo",
    ),
});

export type UsernameInput = z.infer<typeof usernameSchema>;

// Change email
export const changeEmailSchema = z
  .object({
    newEmail: z.string().email("Correo inválido").max(255),
    confirmEmail: z.string().email("Correo inválido").max(255),
    currentPassword: z.string().min(1, "Ingresa tu contraseña actual"),
  })
  .refine((d) => d.newEmail === d.confirmEmail, {
    path: ["confirmEmail"],
    message: "Los correos no coinciden",
  });

export type ChangeEmailInput = z.infer<typeof changeEmailSchema>;

// Change password
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Ingresa tu contraseña actual"),
    newPassword: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Debe incluir una mayúscula")
      .regex(/[a-z]/, "Debe incluir una minúscula")
      .regex(/[0-9]/, "Debe incluir un número")
      .regex(/[^A-Za-z0-9]/, "Debe incluir un símbolo"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  })
  .refine((d) => d.currentPassword !== d.newPassword, {
    path: ["newPassword"],
    message: "La nueva contraseña debe ser distinta a la actual",
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// 2FA - Habilitar
export const twoFactorSchema = z.object({
  code: z
    .string()
    .length(6, "El código debe tener 6 dígitos")
    .regex(/^\d+$/, "Solo números"),
});
export type TwoFactorInput = z.infer<typeof twoFactorSchema>;

// 2FA - Deshabilitar (Requiere contraseña según tu backend)
export const disable2FASchema = z.object({
  password: z.string().min(1, "Ingresa tu contraseña para confirmar"),
  code: z
    .string()
    .length(6, "El código debe tener 6 dígitos")
    .regex(/^\d+$/, "Solo números"),
});
export type Disable2FAInput = z.infer<typeof disable2FASchema>;
