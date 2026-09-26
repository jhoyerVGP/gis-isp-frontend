import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/features/auth/auth.service";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginService,

    onSuccess: () => {
      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("Error al iniciar sesión:", error.message);
    },
  });
};

export default useLogin;
