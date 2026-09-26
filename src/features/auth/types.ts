// Types for Login
export interface AuthResponse {
  tokenType: string;
  expiresIn: number;
}

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
  // falta agregar el avatar en la respuesta de la API
  avatar?: string;
}
