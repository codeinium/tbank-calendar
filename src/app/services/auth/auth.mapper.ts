import {
  ApiAuthTokensResponse,
  ApiLoginRequest,
  ApiRegisterRequest,
  ApiPasswordResetConfirmRequest,
  ApiRefreshRequest,
  ApiPasswordResetVerificationRequest,
  ApiSwitchAccountRequest,
} from './auth.api';

import {
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  PasswordResetConfirmRequest,
  RefreshRequest,
  PasswordResetVerificationRequest,
  SwitchAccountRequest,
} from '@/app/models/auth/auth.model';

export function mapAuthTokens(api: ApiAuthTokensResponse): AuthTokens {
  return {
    accessToken: api.accessToken,
    refreshToken: api.refreshToken,
  };
}

export function mapLoginRequest(request: LoginRequest): ApiLoginRequest {
  return {
    phone: request.phone,
    password: request.password
  };
}

export function mapRegisterRequest(request: RegisterRequest): ApiRegisterRequest {
  return {
    phone: request.phone,
    bankPassword: request.bankPassword,
    newPassword: request.newPassword
  };
}

export function mapPasswordResetConfirmRequest(
  request: PasswordResetConfirmRequest,
): ApiPasswordResetConfirmRequest {
  return {
    email: request.email,
    code: request.code,
    new_password: request.newPassword,
  };
}

export function mapRefreshRequest(
  request: RefreshRequest
): ApiRefreshRequest {
  return {
    refreshToken: request.refreshToken
  }
}

export function mapPasswordResetVerificationRequest (
  request: PasswordResetVerificationRequest
): ApiPasswordResetVerificationRequest {
  return {
    email: request.email
  }
}

export function mapSwitchAccountRequest (
  request: SwitchAccountRequest
): ApiSwitchAccountRequest {
  return {
    accountId: request.accountId
  }
}