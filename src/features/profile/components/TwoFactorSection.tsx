import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  ShieldOff,
  Copy,
  Check,
  Smartphone,
  KeyRound,
} from "lucide-react";
import {
  twoFactorSchema,
  type TwoFactorInput,
} from "@/features/profile/profile.schema";
//import { useToggle2FA } from "../hooks/useProfile";
import type { ProfileUser } from "../types";
import { getFriendlyErrorMessage } from "@/utils/errorHandler";

type Step = "idle" | "scanning" | "confirming" | "disabling";

export function TwoFactorSection({ profile }: { profile: ProfileUser }) {
  const [step, setStep] = useState<Step>("idle");
  const [setup, setSetup] = useState<{
    qrDataUrl: string;
    secret: string;
    otpauthUrl: string;
    recoveryCodes?: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // const { start, confirm, disable, isPending, error } = useToggle2FA();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TwoFactorInput>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: "" },
  });

  const handleEnable = async () => {
    //const data = await start();
    //setSetup(data);
    setStep("scanning");
  };

  const handleConfirm = (data: TwoFactorInput) => {
    /* confirm(
      { code: data.code, secret: setup?.secret },
      {
        onSuccess: () => {
          reset();
          setStep("idle");
        },
      },
    ); */
  };

  const handleDisable = (data: TwoFactorInput) => {
    /* disable(
      { code: data.code },
      {
        onSuccess: () => {
          reset();
          setStep("idle");
        },
      },
    ); */
  };

  const copySecret = async () => {
    if (!setup?.secret) return;
    await navigator.clipboard.writeText(setup.secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="rounded-lg border bg-card p-5">
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold">
            {profile.twoFactorEnabled ? (
              <ShieldCheck className="size-5 text-emerald-600" />
            ) : (
              <ShieldOff className="size-5 text-muted-foreground" />
            )}
            Autenticación en dos pasos (2FA)
          </h2>
          <p className="text-sm text-muted-foreground">
            Protege tu cuenta con una app como Google Authenticator, Authy o
            1Password.
          </p>
        </div>
        <Badge variant={profile.twoFactorEnabled ? "default" : "outline"}>
          {profile.twoFactorEnabled ? "Activado" : "Desactivado"}
        </Badge>
      </header>

      {/* ---------- Estado: idle ---------- */}
      {step === "idle" && (
        <div className="flex justify-end">
          {profile.twoFactorEnabled ? (
            <Button variant="destructive" onClick={() => setStep("disabling")}>
              Desactivar 2FA
            </Button>
          ) : (
            <>
              {/* <Button onClick={handleEnable} disabled={isPending}>
                {isPending ? "Generando…" : "Activar 2FA"}
            </Button> */}
            </>
          )}
        </div>
      )}

      {/* ---------- Paso: escanear QR ---------- */}
      {step === "scanning" && setup && (
        <div className="space-y-5">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <div className="rounded-lg border bg-white p-3">
              {/* Si backend devuelve SVG, usa dangerouslySetInnerHTML.
                  Si devuelve dataURL, usa <img src={setup.qrDataUrl} /> */}
              <img
                src={setup.qrDataUrl}
                alt="Código QR para 2FA"
                className="size-44"
              />
            </div>

            <div className="flex-1 space-y-3 text-sm">
              <p className="flex items-center gap-2 font-medium">
                <Smartphone className="size-4" /> 1. Escanea el código
              </p>
              <p className="text-muted-foreground">
                Abre tu app de autenticación y escanea el QR. Si no puedes,
                ingresa el código manualmente:
              </p>

              <div className="flex items-center gap-2">
                <code className="flex-1 truncate rounded bg-muted px-2 py-1 font-mono text-xs">
                  {setup.secret}
                </code>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={copySecret}
                >
                  {copied ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>

              <p className="flex items-center gap-2 font-medium">
                <KeyRound className="size-4" /> 2. Ingresa el código de 6
                dígitos
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleConfirm)}
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor="code">Código de verificación</Label>
              <Input
                id="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                {...register("code")}
              />
              {errors.code && (
                <p className="text-xs text-destructive">
                  {errors.code.message}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setStep("idle");
                  setSetup(null);
                  reset();
                }}
              >
                Cancelar
              </Button>
              {/* <Button type="submit" disabled={isPending}>
                {isPending ? "Verificando…" : "Confirmar"}
              </Button> */}
            </div>
          </form>

          {setup.recoveryCodes && (
            <div className="rounded-md border bg-muted/40 p-3 text-sm">
              <p className="mb-2 font-medium">Códigos de recuperación</p>
              <p className="mb-3 text-muted-foreground">
                Guárdalos en un lugar seguro. Cada uno sirve una sola vez si
                pierdes tu dispositivo.
              </p>
              <div className="grid grid-cols-2 gap-1 font-mono text-xs">
                {setup.recoveryCodes.map((c) => (
                  <span key={c} className="rounded bg-background px-2 py-1">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------- Paso: desactivar ---------- */}
      {step === "disabling" && (
        <form
          onSubmit={handleSubmit(handleDisable)}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="flex-1 space-y-2">
            <Label htmlFor="code-disable">
              Ingresa tu código actual para desactivar
            </Label>
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
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setStep("idle");
                reset();
              }}
            >
              Cancelar
            </Button>
            {/* <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? "Desactivando…" : "Desactivar"}
            </Button> */}
          </div>
        </form>
      )}

      {/* {error && (
        <div className="mt-3 rounded bg-red-100 p-2 text-sm text-red-700">
          {getFriendlyErrorMessage(error)}
        </div>
      )} */}
    </section>
  );
}
