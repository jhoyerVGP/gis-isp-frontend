import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { axiosClient } from "@/api/axiosClient";

type Status = "loading" | "success" | "error";

function ConfirmEmailChangePage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const hasConfirmed = useRef(false);

  useEffect(() => {
    if (hasConfirmed.current) return;

    hasConfirmed.current = true;

    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      toast.error("El enlace de confirmación no es válido.");
      return;
    }

    const confirmEmailChange = async () => {
      try {
        await axiosClient.post("/account/email-change/confirm", {
          token,
        });

        setStatus("success");
        toast.success("Correo electrónico verificado correctamente.", {
          position: "top-center",
          duration: 5000,
        });
      } catch (error) {
        setStatus("error");
        toast.error("No se pudo confirmar el cambio de correo.", {
          position: "top-center",
          duration: 5000,
        });
      }
    };

    confirmEmailChange();
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
                <Loader2 className="size-7 animate-spin text-primary" />
              </div>

              <CardTitle>Confirmando tu correo</CardTitle>

              <CardDescription>
                Estamos verificando el enlace de confirmación. Un momento...
              </CardDescription>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="size-7 text-green-600" />
              </div>

              <CardTitle>Correo confirmado</CardTitle>

              <CardDescription>
                Tu dirección de correo electrónico se actualizó correctamente.
              </CardDescription>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="size-7 text-destructive" />
              </div>

              <CardTitle>No se pudo confirmar</CardTitle>

              <CardDescription>
                El enlace no es válido, ha expirado o ya fue utilizado.
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="flex justify-center">
          {status === "success" && (
            <Button render={<Link to="/login" />}>Iniciar sesión</Button>
          )}

          {status === "error" && (
            <Button variant="outline" render={<Link to="/login" />}>
              Volver al inicio de sesión
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfirmEmailChangePage;
