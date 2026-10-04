import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Smartphone, KeyRound } from "lucide-react";
import {
  twoFactorSchema,
  type TwoFactorInput,
} from "@/features/profile/profile.schema";
import type { SetupResponse } from "../../types";

interface Props {
  setupData: SetupResponse;
  onConfirm: (code: string) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
}

export function Enable2FAForm({
  setupData,
  onConfirm,
  onCancel,
  isPending,
}: Props) {
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TwoFactorInput>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (data: TwoFactorInput) => {
    try {
      await onConfirm(data.code);
    } catch (e) {
      setError("code", { message: "Código incorrecto o expirado" });
    }
  };

  const copySecret = async () => {
    await navigator.clipboard.writeText(setupData.secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <QRCodeSVG
            value={setupData.otpauthUri}
            size={160}
            level="M"
            includeMargin={false}
          />
        </div>

        <div className="flex-1 space-y-4 text-sm">
          <div>
            <p className="flex items-center gap-2 font-medium">
              <Smartphone className="size-4" /> 1. Escanea el código
            </p>
            <p className="mt-1 text-muted-foreground">
              Abre tu app de autenticación (Google Authenticator, Authy, etc) y
              escanea el QR.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-muted-foreground">
              ¿No puedes escanearlo? Usa este código:
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate rounded-md bg-muted px-3 py-1.5 font-mono text-xs">
                {setupData.secret}
              </code>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={copySecret}
                className="cursor-pointer"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="code" className="flex items-center gap-2">
            <KeyRound className="size-4" /> 2. Ingresa el código de 6 dígitos
          </Label>
          <Input
            id="code"
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
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Verificando…" : "Confirmar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
