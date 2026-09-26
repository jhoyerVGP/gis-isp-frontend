import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutService } from "@/features/auth/auth.service";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutService,

    onSettled: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },

    onError: (error) => {
      console.error("Error al cerrar sesión:", error);
    },
  });
};

export default useLogout;
