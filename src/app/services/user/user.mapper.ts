import {
  ApiAccountMeResponse,
  ApiUserEmailConfirmRequest,
  ApiUserEmailRequest,
  ApiUserMeResponse,
  ApiUserPasswordChangeRequest,
  ApiUserUpdateNameRequest,
} from './user.api';

import {
  User,
  ChangePasswordRequest,
  UserEmail,
  EmailConfirmRequest,
  UpdateNameRequest,
  Account,
} from '@/app/models/user/user.model';

export function mapUser(api: ApiUserMeResponse): User {
  return {
    id: api.user_id,
    firstName: api.first_name,
    lastName: api.last_name,
    email: api.email,
    phone: api.phone,
    accountId: api.account_id,
  };
}

export function mapChangePasswordRequest(
  request: ChangePasswordRequest,
): ApiUserPasswordChangeRequest {
  return {
    current_password: request.currentPassword,
    new_password: request.newPassword,
  };
}

export function mapEmailConfirmRequest(request: EmailConfirmRequest): ApiUserEmailConfirmRequest {
  return {
    email: request.email,
    code: request.code,
  };
}

export function mapUpdateNameRequest(request: UpdateNameRequest): ApiUserUpdateNameRequest {
  return {
    firstName: request.firstName,
    lastName: request.lastName,
  };
}

export function mapAccount(api: ApiAccountMeResponse): Account {
  return {
    accountId: api.accountId,
    customerId: api.customerId,
    accountNumber: api.accountNumber,
    status: api.status,
    balance: api.balance,
    createdAt: api.createdAt,
    updateAt: api.updateAt,
  };
}
