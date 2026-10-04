import { axiosClient } from "@/api/axiosClient";
import type { BackupCodesResponse, ProfileUser, SetupResponse } from "./types";
import type { PersonalInfoInput } from "./profile.schema";

// Service function get user profile
export const getUserProfileService = async (
  userId: string,
): Promise<ProfileUser> => {
  const { data } = await axiosClient.get(`/users/${userId}`);
  return data;
};

// update user profile admin service
export const updateUserProfileAdminService = async (
  userId: string,
  profileData: PersonalInfoInput,
): Promise<void> => {
  const { data } = await axiosClient.put(
    `/users/me/profile/person`,
    profileData,
  );
  return data;
};

// update password service
export const changePasswordService = async (
  newPassword: string,
  currentPassword: string,
): Promise<void> => {
  const { data } = await axiosClient.patch(`/users/me/change-password`, {
    newPassword,
    currentPassword,
  });
  return data;
};

// update data user service
export interface UpdateAccountPayload {
  userId: string;
  username: string | undefined;
  avatarFile?: File | Blob | null;
}

export const updateAccountInfoService = async ({
  username,
  avatarFile,
}: UpdateAccountPayload) => {
  const formData = new FormData();

  if (username) {
    formData.append("username", username);
  }

  if (avatarFile) {
    formData.append("avatar", avatarFile);
  }

  const response = await axiosClient.patch(
    `/users/me/profile/account`,
    formData,
  );

  return response.data;
};

// Change email service
export const changeEmailService = async (
  newEmail: string,
  currentPassword: string,
): Promise<void> => {
  const { data } = await axiosClient.post(`/account/email-change`, {
    newEmail,
    currentPassword,
  });
  return data;
};

// 2FA services
export const setup2FAService = async (): Promise<SetupResponse> => {
  const { data } = await axiosClient.post("/2fa/setup");
  return data;
};

export const enable2FAService = async (
  code: string,
): Promise<BackupCodesResponse> => {
  const { data } = await axiosClient.post("/2fa/enable", { code });
  return data;
};

export const disable2FAService = async (
  password: string,
  code: string,
): Promise<void> => {
  const { data } = await axiosClient.post("/2fa/disable", { password, code });
  return data;
};
