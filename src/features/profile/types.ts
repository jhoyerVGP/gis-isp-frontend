// type user profile
export type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";

export interface ProfileUser {
  id: string;

  // Data Person
  firstName: string;
  lastName: string;
  phone: string;
  ci: string;

  // Data User
  username: string;
  email: string;
  roleId: number;
  roleName: string;
  status: UserStatus;
  twoFactorEnabled: boolean;
}
