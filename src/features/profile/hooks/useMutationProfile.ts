import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeEmailService,
  changePasswordService,
  disable2FAService,
  enable2FAService,
  setup2FAService,
  updateAccountInfoService,
  updateUserProfileAdminService,
  type UpdateAccountPayload,
} from "@/features/profile/profile.service";
import type { PersonalInfoInput } from "../profile.schema";

// hook para actualizar la información personal del usuario (admin)
export const useUpdatePersonAdminProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      profileData,
    }: {
      userId: string;
      profileData: PersonalInfoInput;
    }) => updateUserProfileAdminService(userId, profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

// hook para cambiar contraseña
export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      newPassword,
      currentPassword,
    }: {
      newPassword: string;
      currentPassword: string;
    }) => changePasswordService(newPassword, currentPassword),
  });
};

// hook para actualizar la información de la cuenta del usuario
export const useUpdateAccountInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAccountPayload) => updateAccountInfoService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

// hook para cambiar correo electrónico
export const useChangeEmail = () => {
  return useMutation({
    mutationFn: ({
      newEmail,
      currentPassword,
    }: {
      newEmail: string;
      currentPassword: string;
    }) => changeEmailService(newEmail, currentPassword),
  });
};

// 2FA hooks
// hook para configurar 2FA paso 1
export const useSetup2FA = () => {
  return useMutation({
    mutationFn: () => setup2FAService(),
  });
};

// hook para habilitar 2FA
export const useEnable2FA = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => enable2FAService(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

// hook para deshabilitar 2FA
export const useDisable2FA = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ password, code }: { password: string; code: string }) =>
      disable2FAService(password, code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
