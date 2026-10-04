import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { useProfileHandler } from "../../hooks/useProfileHandler";
import type { Disable2FAInput } from "../../profile.schema";
import { Disable2FAForm } from "./Disable2FAForm";
import { BackupCodesView } from "./BackupCodesView";
import { Enable2FAForm } from "./Enable2FAForm";
import type { SetupResponse } from "../../types";

type Step = "idle" | "scanning" | "backup-codes" | "disabling";

export function TwoFactorSection({
  twoFactorEnabled,
}: {
  twoFactorEnabled: boolean;
}) {
  const [step, setStep] = useState<Step>("idle");
  const [setup, setSetup] = useState<SetupResponse | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const { start, confirm, disable, isLoading } = useProfileHandler();

  const handleEnableStart = async () => {
    try {
      const data = await start();
      if (data) {
        setSetup(data);
        setStep("scanning");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmCode = async (code: string) => {
    const response = await confirm(code);
    if (response && response.backupCodes) {
      setBackupCodes(response.backupCodes);
      setStep("backup-codes");
      setSetup(null);
    }
  };

  const handleDisable = async (data: Disable2FAInput) => {
    await disable(data.password, data.code);
    setStep("idle");
  };

  return (
    <section className="rounded-lg border bg-card p-5 shadow-sm">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold">
            {twoFactorEnabled ? (
              <ShieldCheck className="size-5 text-emerald-600" />
            ) : (
              <ShieldOff className="size-5 text-muted-foreground" />
            )}
            Autenticación en dos pasos (2FA)
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Protege tu cuenta con una app como Google Authenticator o Authy.
          </p>
        </div>
        <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
          {twoFactorEnabled ? "Activado" : "Desactivado"}
        </Badge>
      </header>

      <div className="mt-4">
        {step === "idle" && (
          <div className="flex justify-end">
            {twoFactorEnabled ? (
              <Button
                variant="destructive"
                onClick={() => setStep("disabling")}
              >
                Desactivar 2FA
              </Button>
            ) : (
              <Button onClick={handleEnableStart} disabled={isLoading} className="cursor-pointer">
                {isLoading ? "Iniciando…" : "Configurar 2FA"}
              </Button>
            )}
          </div>
        )}

        {step === "scanning" && setup && (
          <Enable2FAForm
            setupData={setup}
            onConfirm={handleConfirmCode}
            onCancel={() => {
              setStep("idle");
              setSetup(null);
            }}
            isPending={isLoading}
          />
        )}

        {step === "backup-codes" && backupCodes.length > 0 && (
          <BackupCodesView
            codes={backupCodes}
            onFinish={() => {
              setStep("idle");
              setBackupCodes([]);
            }}
          />
        )}

        {step === "disabling" && (
          <Disable2FAForm
            onDisable={handleDisable}
            onCancel={() => setStep("idle")}
            isPending={isLoading}
          />
        )}
      </div>
    </section>
  );
}
