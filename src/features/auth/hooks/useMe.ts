import { useQuery } from "@tanstack/react-query";
import { getCurrentUserService } from "@/features/auth/auth.service";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUserService,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: false,
  });
}
