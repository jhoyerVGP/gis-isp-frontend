import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/features/auth/auth.service";
import { useNavigate } from "react-router-dom";
import type { LoginResponse } from "../types";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginService,

    onSuccess: (data: LoginResponse) => {
      if ("twoFactorRequired" in data && data.twoFactorRequired) {
        navigate("/login/2fa");
        return;
      }

      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("Error al iniciar sesión:", error.message);
    },
  });
};

export default useLogin;
