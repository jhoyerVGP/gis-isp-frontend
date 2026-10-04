import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  disable2FASchema,
  type Disable2FAInput,
} from "@/features/profile/profile.schema";

interface Props {
  onDisable: (data: Disable2FAInput) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
}

export function Disable2FAForm({ onDisable, onCancel, isPending }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Disable2FAInput>({
    resolver: zodResolver(disable2FASchema),
    defaultValues: { password: "", code: "" },
  });

  return (
    <form onSubmit={handleSubmit(onDisable)} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="password-disable">Contraseña actual</Label>
          <Input
            id="password-disable"
            type="password"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="code-disable">Código 2FA actual</Label>
          <Input
            id="code-disable"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="123456"
            {...register("code")}
          />
          {errors.code && (
            <p className="text-xs text-destructive">{errors.code.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="destructive" disabled={isPending}>
          {isPending ? "Desactivando…" : "Desactivar"}
        </Button>
      </div>
    </form>
  );
}
