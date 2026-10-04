import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, ShieldCheck } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useVerifyTwoFactor from "../hooks/useVerifyTwoFactor";
import { getFriendlyErrorMessage } from "@/utils/errorHandler";
import { twoFactorSchema, type TwoFactorInput } from "../auth.schema";

function TwoFactorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorInput>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutate, isPending, error } = useVerifyTwoFactor();

  const onSubmit = (data: TwoFactorInput) => {
    mutate(data.code);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex justify-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="size-6 text-primary" />
        </div>
      </div>

      <div className="space-y-1 text-center">
        <h2 className="text-xl font-semibold">Verificación en dos pasos</h2>

        <p className="text-sm text-muted-foreground">
          Ingresa el código de tu aplicación de autenticación o un código de
          respaldo.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Código de autenticación</Label>

        <Input
          id="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123456"
          maxLength={20}
          {...register("code")}
        />

        {errors.code && (
          <p className="text-xs font-medium text-destructive">
            {errors.code.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full py-5 text-md cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Verificando...
          </>
        ) : (
          "Verificar"
        )}
      </Button>

      {error && (
        <div className="flex items-center justify-center gap-2 rounded bg-red-100 p-3 text-center text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{getFriendlyErrorMessage(error)}</span>
        </div>
      )}
    </form>
  );
}

export default TwoFactorForm;
