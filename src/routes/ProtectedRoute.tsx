import { useMe } from "@/features/auth/hooks/useMe";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = () => {
  // hook me
  const { data: user, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Entrando al sistema...
          </p>
        </div>
      </div>
    );
  }

  if (!user || isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
