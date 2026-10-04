import { useQuery } from "@tanstack/react-query";
import { getUserProfileService } from "@/features/profile/profile.service";
import { useMe } from "@/features/auth/hooks/useMe";

export const useProfile = () => {
  //current user
  const { data } = useMe();
  const userId = data?.id;

  if (!userId) {
    throw new Error("User ID not found");
  }

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfileService(userId),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};