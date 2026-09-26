import { axiosClient } from "@/api/axiosClient";
import type { ProfileUser } from "./types";

// Service function get user profile
export const getUserProfileService = async (
  userId: string,
): Promise<ProfileUser> => {
  const { data } = await axiosClient.get(`/users/${userId}`);
  return data;
};
