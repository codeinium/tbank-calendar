import {
  Goal,
  GoalDetails,
  CreateGoalRequest,
  GoalContributeRequest,
  GoalWithdrawRequest,
  UpdateGoalRequest,
  UpdateGoalAutoPayRequest,
} from '../../models/goal/goal.model';

import { mapTransaction } from '../transaction/transaction.mapper';

import {
  ApiGoal,
  ApiGoalDetails,
  ApiCreateGoalRequest,
  ApiGoalContributeRequest,
  ApiGoalWithdrawRequest,
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
    billingCycle: api.billing_interval ?? null,
    billingInterval: api.billing_cycle ?? null,

    autoPayAmount: api.auto_pay_amount ?? null,
    transactions: api.transactions?.map(mapTransaction) ?? [],
  };
}

export function mapCreateGoal(model: CreateGoalRequest): ApiCreateGoalRequest {
  return {
    refund_account_id: model.refundAccountId,
    name: model.name,
    target_amount: model.targetAmount,
    deadline: model.deadline,
    hard_mode: model.hardMode,
    auto_pay: model.autoPay,
    auto_pay_account_id: model.autoPayAccountId,
    billing_cycle: model.billingInterval,
    billing_interval: model.billingCycle,

    auto_pay_amount: model.autoPayAmount,
  };
}

export function mapContributeGoal(model: GoalContributeRequest): ApiGoalContributeRequest {
  return {
    from_account_id: model.accountId,
    amount: model.amount,
  };
}

export function mapWithdrawGoal(model: GoalWithdrawRequest): ApiGoalWithdrawRequest {
  return {
    amount: model.amount,
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
    auto_pay: model.isActive,
    auto_pay_account_id: model.autoPayAccountId,
    billing_cycle: model.billingInterval,
    billing_interval: model.billingCycle,
    auto_pay_amount: model.amount,
  };
}
