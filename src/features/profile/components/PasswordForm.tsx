import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/features/profile/profile.schema";
import { Card } from "@/components/ui/card";
import { useProfileHandler } from "../hooks/useProfileHandler";
import { FormTextField } from "@/components/common/FormTextField";
import { FormPasswordField } from "@/components/common/FormPasswordField";

export function PasswordForm() {
  const { isLoading, changePassword } = useProfileHandler();

  const { control, handleSubmit } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordInput) => {
    changePassword(data.currentPassword, data.newPassword);
  };

  return (
    <Card className="p-2 lg:p-6">
      <header className="mb-4">
        <h2 className="text-base font-semibold">Cambiar contraseña</h2>
        <p className="text-sm text-muted-foreground">
          Se cerrarán tus otras sesiones al cambiarla.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormTextField
          control={control}
          name="currentPassword"
          label="Contraseña actual"
          required
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormPasswordField
            control={control}
            name="newPassword"
            label="Nueva contraseña"
            autoComplete="new-password"
            required
          />

          <FormPasswordField
            control={control}
            name="confirmPassword"
            label="Confirmar contraseña"
            autoComplete="new-password"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="cursor-pointer">
            {isLoading ? "Actualizando…" : "Cambiar contraseña"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
