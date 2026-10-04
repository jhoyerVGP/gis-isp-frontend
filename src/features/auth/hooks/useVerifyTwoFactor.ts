import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { verifyTwoFactorService } from "../auth.service";

const useVerifyTwoFactor = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyTwoFactorService,

    onSuccess: () => {
      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("Error al verificar 2FA:", error.message);
    },
  });
};

export default useVerifyTwoFactor;
