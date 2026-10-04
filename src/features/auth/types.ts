// Types for Login
export interface LoginSuccessResponse {
  tokenType: string;
  expiresIn: number;
}

export interface TwoFactorRequiredResponse {
  twoFactorRequired: true;
}

export type LoginResponse = LoginSuccessResponse | TwoFactorRequiredResponse;

// Types for User
export interface UserAuthenticated {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
  mustSetPassword: boolean;
  twoFactorEnabled: boolean;
  avatarUrl?: string;
}
