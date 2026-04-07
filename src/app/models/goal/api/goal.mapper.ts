import {
  Goal,
  GoalDetails,
  CreateGoalRequest,
  GoalTransactionRequest,
  UpdateGoalRequest,
  UpdateGoalAutoPayRequest
} from '../model/goal.model';
import {
  ApiGoal,
  ApiGoalDetails,
  ApiCreateGoalRequest,
  ApiGoalTransactionRequest,
  ApiUpdateGoalRequest,
  ApiUpdateGoalAutoPayRequest
} from '../api/goal.api';

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
    accountId: api.account_id,
    name: api.name,
    targetAmount: api.target_amount,
    currentAmount: api.current_amount,
    deadline: api.deadline,
    achievedAt: api.achieved_at,
    hardMode: api.hard_mode,
    status: api.status,
    autoPay: api.auto_pay,
  };
}

export function mapCreateGoal(model: CreateGoalRequest): ApiCreateGoalRequest {
  return {
    name: model.name,
    target_amount: model.targetAmount,
    deadline: model.deadline,
    hard_mode: model.hardMode,
    auto_pay: model.autoPay,
    account_id: model.accountId,
    billing_cycle: model.billingCycle,
    billing_interval: model.billingInterval,
    auto_pay_amount: model.autoPayAmount,
  };
}

export function mapTransactionGoal(model: GoalTransactionRequest): ApiGoalTransactionRequest {
  return {
    id: model.id,
    amount: model.amount,
    account_id: model.accountId
  }
}

export function mapUpdateGoal(model: UpdateGoalRequest): ApiUpdateGoalRequest {
  return {
    id: model.id,
    name: model.name,
    deadline: model.deadline
  }
}

export function mapUpdateGoalAutoPay(model: UpdateGoalAutoPayRequest) : ApiUpdateGoalAutoPayRequest {
  return {
    id: model.id,
    is_active: model.isActive,
    account_id: model.accountId,
    billing_cycle: model.billingCycle,
    billing_interval: model.billingInterval,
    amount: model.amount
  }
}