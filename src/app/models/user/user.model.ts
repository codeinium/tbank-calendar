export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
}

export interface UserEmail {
  email: string;
}

export interface EmailVerificationRequest {
  email: string;
}

export interface EmailConfirmRequest {
  email: string;
  code: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateNameRequest {
  firstName: string;
  lastName: string;
}
