import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailCheck } from "lucide-react";
import {
  changeEmailSchema,
  type ChangeEmailInput,
} from "@/features/profile/profile.schema";
import type { ProfileUser } from "../types";
import { Card } from "@/components/ui/card";
import { useProfileHandler } from "../hooks/useProfileHandler";

export function EmailForm({ profile }: { profile: ProfileUser }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeEmailInput>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: "",
      confirmEmail: "",
      currentPassword: "",
    },
  });

  const { isLoading, changeEmail } = useProfileHandler();

  const onSubmit = (data: ChangeEmailInput) => {
    changeEmail(data.newEmail, data.currentPassword);
    setSent(true);
    reset();
  };

  return (
    <Card className="p-2.5 lg:p-6">
      <header className="mb-4">
        <h2 className="text-base font-semibold">Correo electrónico</h2>
        <p className="text-sm text-muted-foreground">
          Actual: <span className="font-medium">{profile.email}</span>
          {profile.status === "ACTIVE" ? " (verificado)" : " (sin verificar)"}
        </p>
      </header>

      {sent ? (
        <div className="flex items-start gap-3 rounded-md border bg-muted/40 p-3 text-sm">
          <MailCheck className="mt-0.5 size-5 text-primary" />
          <div>
            <p className="font-medium">Revisa tu nuevo correo</p>
            <p className="text-muted-foreground">
              Enviamos un enlace de verificación. Tu correo actual seguirá
              activo hasta que confirmes el cambio.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="newEmail">Nuevo correo</Label>
              <Input id="newEmail" type="email" {...register("newEmail")} />
              {errors.newEmail && (
                <p className="text-xs text-destructive">
                  {errors.newEmail.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmEmail">Confirmar correo</Label>
              <Input
                id="confirmEmail"
                type="email"
                {...register("confirmEmail")}
              />
              {errors.confirmEmail && (
                <p className="text-xs text-destructive">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentPasswordEmail">
              Contraseña actual (para confirmar)
            </Label>
            <Input
              id="currentPasswordEmail"
              type="password"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <p className="text-xs text-destructive">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? "Enviando…" : "Solicitar cambio"}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}
