import AuthForm from "@/features/auth/components/AuthForm";

function LoginPage() {
  return (
    <div className="min-h-svh w-full lg:grid lg:grid-cols-[30%_70%]">
      {/* Panel left */}
      <div className="relative hidden bg-blue-400 lg:flex lg:flex-col lg:justify-between p-10">
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            G
          </div>

          <span className="text-xl font-semibold tracking-tight">GIS-ISP</span>
        </div>

        <div className="relative z-10 max-w-md space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Sistema de gestión de infraestructura FTTH
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Gestiona clientes, infraestructura, técnicos y operaciones desde un
            único lugar.
          </p>
        </div>

        <p className="relative z-10 text-xs text-muted-foreground">
          Sistema interno · GIS-ISP
        </p>
      </div>

      {/* Panel right*/}
      <div className="flex min-h-svh items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              G
            </div>

            <span className="text-xl font-semibold tracking-tight">
              GIS-ISP
            </span>
          </div>

          {/* Section heading */}
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              Bienvenido
            </h1>

            <p className="text-sm text-muted-foreground text-center">
              Inicia sesión para acceder al sistema.
            </p>
          </div>

          {/* Form */}
          <AuthForm />

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Acceso exclusivo para usuarios autorizados.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
