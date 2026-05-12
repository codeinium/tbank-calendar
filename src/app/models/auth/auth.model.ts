export interface RegisterRequest {
  phone: string;
  bankPassword: string;
  newPassword: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface PasswordResetVerificationRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface SwitchAccountRequest {
  accountId: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
