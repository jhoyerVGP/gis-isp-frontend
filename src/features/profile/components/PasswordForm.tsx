import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/features/profile/profile.schema";
//import { useChangePassword } from "../hooks/useProfile";
import { getFriendlyErrorMessage } from "@/utils/errorHandler";

export function PasswordForm() {
  const [show, setShow] = useState(false);
  //const { mutate, isPending, error } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordInput) => {
    //mutate(data, { onSuccess: () => reset() });
  };

  return (
    <section className="rounded-lg border bg-card p-5">
      <header className="mb-4">
        <h2 className="text-base font-semibold">Cambiar contraseña</h2>
        <p className="text-sm text-muted-foreground">
          Se cerrarán tus otras sesiones al cambiarla.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Contraseña actual</Label>
          <Input
            id="currentPassword"
            type={show ? "text" : "password"}
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-xs text-destructive">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nueva contraseña</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={show ? "text" : "password"}
                className="pr-10"
                {...register("newPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-muted-foreground"
                onClick={() => setShow((v) => !v)}
              >
                {show ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-destructive">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              id="confirmPassword"
              type={show ? "text" : "password"}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* {error && (
          <div className="rounded bg-red-100 p-2 text-sm text-red-700">
            {getFriendlyErrorMessage(error)}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Actualizando…" : "Cambiar contraseña"}
          </Button>
        </div> */}
      </form>
    </section>
  );
}
