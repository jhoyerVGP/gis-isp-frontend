import { useToastPromise } from "@/hooks/useToastPromise";
import type { PersonalInfoInput } from "@/features/profile/profile.schema";
import {
  useChangeEmail,
  useChangePassword,
  useDisable2FA,
  useEnable2FA,
  useSetup2FA,
  useUpdateAccountInfo,
  useUpdatePersonAdminProfile,
} from "@/features/profile/hooks/useMutationProfile";

export const useProfileHandler = () => {
  const updatePersonProfileMutation = useUpdatePersonAdminProfile();
  const changePasswordMutation = useChangePassword();
  const updateAccountInfoMutation = useUpdateAccountInfo();
  const updateEmailMutation = useChangeEmail();
  const setupMutation = useSetup2FA();
  const enableMutation = useEnable2FA();
  const disableMutation = useDisable2FA();

  const { execute } = useToastPromise();

  // actualizar datos personales del usuario (admin)
  const updatePersonProfile = async (
    userId: string,
    profileData: PersonalInfoInput,
  ) => {
    return execute(
      updatePersonProfileMutation.mutateAsync({
        userId,
        profileData,
      }),
      {
        loading: "Actualizando datos personales...",
        success: "Datos personales actualizados correctamente",
      },
    );
  };

  // cambiar contraseña del usuario
  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    return execute(
      changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
      }),
      {
        loading: "Cambiando contraseña...",
        success: "Contraseña actualizada correctamente",
      },
    );
  };

  // actualizar datos de la cuenta del usuario
  const updateAccountInfo = async (
    userId: string,
    username: string | undefined,
    avatarFile?: File | Blob | null,
  ) => {
    return execute(
      updateAccountInfoMutation.mutateAsync({
        userId,
        username,
        avatarFile,
      }),
      {
        loading: "Actualizando datos de la cuenta...",
        success: "Cuenta actualizada correctamente",
      },
    );
  };

  // cambiar correo electrónico del usuario
  const changeEmail = async (newEmail: string, currentPassword: string) => {
    return execute(
      updateEmailMutation.mutateAsync({
        newEmail,
        currentPassword,
      }),
      {
        loading: "Cambiando correo electrónico...",
        success: "Correo electrónico actualizado correctamente",
      },
    );
  };

  // 2FA configuration inicial
  const start = async () => {
    return execute(setupMutation.mutateAsync(), {
      loading: "Generando configuración 2FA...",
      success: "Escanea el código QR para continuar",
    });
  };

  // confirmar habilitación de 2FA
  const confirm = async (code: string) => {
    return execute(enableMutation.mutateAsync(code), {
      loading: "Verificando código...",
      success: "Autenticación en dos pasos activada",
    });
  };

  // deshabilitar 2FA
  const disable = async (password: string, code: string) => {
    return execute(disableMutation.mutateAsync({ password, code }), {
      loading: "Desactivando 2FA...",
      success: "Autenticación en dos pasos desactivada",
    });
  };

  const isLoading =
    updatePersonProfileMutation.isPending ||
    changePasswordMutation.isPending ||
    updateAccountInfoMutation.isPending ||
    setupMutation.isPending ||
    enableMutation.isPending ||
    disableMutation.isPending ||
    updateEmailMutation.isPending;

  return {
    updatePersonProfile,
    changePassword,
    updateAccountInfo,
    changeEmail,
    start,
    confirm,
    disable,
    isLoading,
  };
};
