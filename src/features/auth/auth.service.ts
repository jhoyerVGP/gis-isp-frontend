import { axiosClient } from "@/api/axiosClient";
import type { AuthResponse, UserAuthenticated } from "@/features/auth/types";
import type { LoginInput } from "./auth.schema";

// Service function for login
export const loginService = async (
  credentials: LoginInput,
): Promise<AuthResponse> => {
  const { data } = await axiosClient.post<AuthResponse>(
    "/auth/login",
    credentials,
  );
  return data;
};

// Service function for logout
export const logoutService = async (): Promise<void> => {
  await axiosClient.post("/auth/logout");
};

// Service function to get the current authenticated user
export const getCurrentUserService = async (): Promise<UserAuthenticated> => {
  const { data } = await axiosClient.get<UserAuthenticated>("/auth/me");
  return data;
};
