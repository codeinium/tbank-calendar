import {
  Goal,
  GoalDetails,
  CreateGoalRequest,
  GoalTransactionRequest,
  UpdateGoalRequest,
  UpdateGoalAutoPayRequest,
} from '../../models/goal/goal.model';

import { mapTransaction } from '../transaction/transaction.mapper';

import {
  ApiGoal,
  ApiGoalDetails,
  ApiCreateGoalRequest,
  ApiGoalTransactionRequest,
  ApiUpdateGoalRequest,
  ApiUpdateGoalAutoPayRequest,
} from './goal.api';

export function mapGoal(api: ApiGoal): Goal {
  return {
    id: api.id,
    name: api.name,
    targetAmount: api.target_amount,
    currentAmount: api.current_amount,
    status: api.status,
  };
}

export function mapGoalDetails(api: ApiGoalDetails): GoalDetails {
  return {
    id: api.id,
    name: api.name,
    targetAmount: api.target_amount,
    currentAmount: api.current_amount,
    status: api.status,
    accountId: api.account_id,
    deadline: api.deadline,
    createdAt: api.created_at,
    achievedAt: api.achieved_at,
    hardMode: api.hard_mode,
    autoPay: api.auto_pay,
    autoPayAccountId: api.auto_pay_account_id ?? null,
    billingCycle: api.billing_cycle ?? null,
    billingInterval: api.billing_interval ?? null,
    autoPayAmount: api.auto_pay_amount ?? null,
    transactions: api.transactions?.map(mapTransaction) ?? [],
  };
}

export function mapCreateGoal(model: CreateGoalRequest): ApiCreateGoalRequest {
  return {
    name: model.name,
    target_amount: model.targetAmount,
    deadline: model.deadline,
    hard_mode: model.hardMode,
    auto_pay: model.autoPay,
    auto_pay_account_id: model.autoPayAccountId,
    billing_cycle: model.billingCycle,
    billing_interval: model.billingInterval,
    auto_pay_amount: model.autoPayAmount,
  };
}

export function mapTransactionGoal(model: GoalTransactionRequest): ApiGoalTransactionRequest {
  return {
    amount: model.amount,
    account_id: model.accountId,
  };
}

export function mapUpdateGoal(model: UpdateGoalRequest): ApiUpdateGoalRequest {
  return {
    name: model.name,
    deadline: model.deadline,
  };
}

export function mapUpdateGoalAutoPay(model: UpdateGoalAutoPayRequest): ApiUpdateGoalAutoPayRequest {
  return {
    is_active: model.isActive,
    auto_pay_account_id: model.autoPayAccountId,
    billing_cycle: model.billingCycle,
    billing_interval: model.billingInterval,
    amount: model.amount,
  };
}

import { GoalAccount } from '../../models/goal/goal.model';
import { ApiGoalAccount } from './goal.api';

export function mapGoalAccount(api: ApiGoalAccount): GoalAccount {
  return {
    id: api.id,
    customerId: api.customer_id,
    accountNumber: api.account_number,
    status: api.status,
    balance: api.balance,
    createdAt: api.created_at,
    updatedAt: api.updated_at,
  };
}