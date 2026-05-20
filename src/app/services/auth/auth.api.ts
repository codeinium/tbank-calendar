export interface ApiRegisterRequest {
  phone: string;
  bankPassword: string;
  newPassword: string;
}

export interface ApiLoginRequest {
  phone: string;
  password: string;
}

export interface ApiRefreshRequest {
  refreshToken: string;
}

export interface ApiPasswordResetVerificationRequest {
  email: string;
}

export interface ApiPasswordResetConfirmRequest {
  email: string;
  code: string;
  new_password: string;
}

export interface ApiSwitchAccountRequest {
  accountId: string;
}

export interface ApiAuthTokensResponse {
  accessToken: string;
  refreshToken: string;
}
