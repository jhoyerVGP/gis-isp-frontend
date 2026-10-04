import { axiosClient } from "@/api/axiosClient";
import type {
  LoginResponse,
  LoginSuccessResponse,
  UserAuthenticated,
} from "@/features/auth/types";
import type { LoginInput } from "./auth.schema";

// Service function for login
export const loginService = async (
  credentials: LoginInput,
): Promise<LoginResponse> => {
  const { data } = await axiosClient.post<LoginResponse>(
    "/auth/login",
    credentials,
  );

  return data;
};

// Service function for verifying two-factor authentication
export const verifyTwoFactorService = async (
  code: string,
): Promise<LoginSuccessResponse> => {
  const { data } = await axiosClient.post<LoginSuccessResponse>(
    "/auth/2fa/verify",
    { code },
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

// Service for refreshing the authentication token
export const refreshTokenService = async (): Promise<LoginSuccessResponse> => {
  const { data } =
    await axiosClient.post<LoginSuccessResponse>("/auth/refresh");

  return data;
};
