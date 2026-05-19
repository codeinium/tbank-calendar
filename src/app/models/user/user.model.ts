export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  accountId: string;
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

export interface Account {
  accountId: string;
  customerId: string;
  accountNumber: string;
  status: string;
  balance: number;
  createdAt: string;
  updateAt: string;
}
