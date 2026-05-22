import dayjs from 'dayjs';
import { Goal, GoalDetails } from '../../models/goal/goal.model';

import {
  ApiCreateGoalRequest,
  ApiGoalTransactionRequest,
  ApiUpdateGoalAutoPayRequest,
  ApiUpdateGoalRequest,
} from './goal.api';
import { Transaction } from '../../models/transaction/transaction.model';
import { TRANSACTIONS_MOCK } from '../transaction/transaction.mock';

export const MOCK_GOALS: Goal[] = [
  {
    id: 'goal-1',
    name: 'На отпуск',
    targetAmount: 150000,
    currentAmount: 75000,
    status: 'active',
  },
  {
    id: 'goal-2',
    name: 'Новый ноутбук',
    targetAmount: 200000,
    currentAmount: 50000,
    status: 'active',
  },
  {
    id: 'goal-3',
    name: 'Подушка безопасности',
    targetAmount: 500000,
    currentAmount: 500000,
    status: 'achieved',
  },
];

export const MOCK_GOAL_DETAILS: Record<string, GoalDetails> = {
  'goal-1': {
    id: 'goal-1',
    accountId: 'acc-1',
    name: 'На отпуск',
    targetAmount: 150000,
    currentAmount: 75000,
    createdAt: '2025-01-01T12:00:00Z',
    deadline: '2026-08-01',
    achievedAt: null,
    hardMode: false,
    status: 'active',
    autoPay: true,
    autoPayAccountId: '1',
    billingCycle: 'daily',
    billingInterval: 5,
    autoPayAmount: 1000,
  },
  'goal-2': {
    id: 'goal-2',
    accountId: 'acc-2',
    name: 'Новый ноутбук',
    targetAmount: 200000,
    currentAmount: 50000,
    createdAt: '2025-06-15T09:30:00Z',
    deadline: '2026-12-01',
    achievedAt: null,
    hardMode: true,
    status: 'active',
    autoPay: false,
  },
  'goal-3': {
    id: 'goal-3',
    accountId: 'acc-3',
    name: 'Подушка безопасности',
    targetAmount: 500000,
    currentAmount: 500000,
    createdAt: '2024-03-10T15:45:00Z',
    deadline: '2026-03-15',
    achievedAt: '2026-03-15T10:30:00Z',
    hardMode: false,
    status: 'achieved',
    autoPay: false,
  },
};

export function getMockGoalDetails(goalId: string): GoalDetails | null {
  return MOCK_GOAL_DETAILS[goalId] || null;
}

export function getMockTransactions(goalId: string): Transaction[] {
  let transactions = TRANSACTIONS_MOCK.filter(
    (t) => t.counterpartyName === goalId
  );
  return transactions;
}

export function createMockGoal(request: ApiCreateGoalRequest): GoalDetails {
  return {
    id: `goal-${Date.now()}`,
    accountId: request.auto_pay_account_id ?? 'default',

    name: request.name,
    targetAmount: request.target_amount,
    currentAmount: 0,

    createdAt: dayjs().toISOString(),
    deadline: request.deadline,
    achievedAt: null,

    hardMode: request.hard_mode,
    status: 'active',

    autoPay: request.auto_pay,

    autoPayAccountId: request.auto_pay_account_id,
    billingCycle: request.billing_cycle,
    billingInterval: request.billing_interval,
    autoPayAmount: request.auto_pay_amount,
  };
}

export function mockDepositToGoal(goalId: string, request: ApiGoalTransactionRequest): GoalDetails {
  const goal = getMockGoalDetails(goalId);
  if (!goal) throw new Error(`Goal with id ${goalId} not found`);

  const newAmount = goal.currentAmount + request.amount;
  const isAchieved = newAmount >= goal.targetAmount;

  return {
    ...goal,
    currentAmount: newAmount,
    status: isAchieved ? 'achieved' : goal.status,
    achievedAt: isAchieved ? new Date().toISOString() : goal.achievedAt,
  };
}

export function mockWithdrawFromGoal(
  goalId: string,
  request: ApiGoalTransactionRequest,
): GoalDetails {
  const goal = getMockGoalDetails(goalId);
  if (!goal) throw new Error(`Goal with id ${goalId} not found`);

  const newAmount = Math.max(0, goal.currentAmount - request.amount);

  return {
    ...goal,
    currentAmount: newAmount,
    status: newAmount >= goal.targetAmount ? 'achieved' : 'active',
    achievedAt: newAmount >= goal.targetAmount ? new Date().toISOString() : null,
  };
}

export function mockUpdateGoalAutoPay(
  goalId: string,
  request: ApiUpdateGoalAutoPayRequest,
): GoalDetails {
  const goal = getMockGoalDetails(goalId);
  if (!goal) throw new Error(`Goal with id ${goalId} not found`);

  if (!request.is_active) {
    return {
      ...goal,
      autoPay: false,
      autoPayAccountId: undefined,
      billingCycle: undefined,
      billingInterval: undefined,
      autoPayAmount: undefined,
    };
  }

  return {
    ...goal,
    autoPay: true,
    autoPayAccountId: request.auto_pay_account_id ?? goal.autoPayAccountId,
    billingCycle: request.billing_cycle ?? goal.billingCycle,
    billingInterval: request.billing_interval ?? goal.billingInterval,
    autoPayAmount: request.amount ?? goal.autoPayAmount,
  };
}

export function mockUpdateGoal(goalId: string, request: ApiUpdateGoalRequest): GoalDetails {
  const goal = getMockGoalDetails(goalId);
  if (!goal) throw new Error(`Goal with id ${goalId} not found`);

  return {
    ...goal,
    name: request.name,
    deadline: request.deadline,
  };
}
