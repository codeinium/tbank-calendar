export interface ApiUserMeResponse {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string;
  account_id: string;
}

export interface ApiUserEmailRequest {
  email: string;
}

export interface ApiUserEmailVerificationRequest {
  email: string;
}

export interface ApiUserEmailConfirmRequest {
  email: string;
  code: string;
}

export interface ApiUserPasswordChangeRequest {
  current_password: string;
  new_password: string;
}

export interface ApiUserUpdateNameRequest {
  firstName: string;
  lastName: string;
}

export interface ApiAccountMeResponse {
  accountId: string;
  customerId: string;
  accountNumber: string;
  status: string;
  balance: number;
  createdAt: string;
  updateAt: string;
}