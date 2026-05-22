import dayjs from 'dayjs';
import { Goal, GoalDetails } from '../../models/goal/goal.model';
import {
  ApiCreateGoalRequest,
  ApiGoalTransactionRequest,
  ApiUpdateGoalAutoPayRequest,
  ApiUpdateGoalRequest,
} from './goal.api';
import { TRANSACTIONS_MOCK } from '../transaction/transaction.mock';
import { GoalAccount } from '../../models/goal/goal.model';

export const MOCK_GOAL_ACCOUNTS: GoalAccount[] = [
  {
    id: 'account-main-1',
    customerId: 'customer-1',
    accountNumber: '40817810000000000001',
    status: 'ACTIVE',
    balance: 125000,
    createdAt: '2025-01-01T12:00:00Z',
    updatedAt: '2026-05-01T12:00:00Z',
  },
  {
    id: 'account-main-2',
    customerId: 'customer-1',
    accountNumber: '40817810000000000002',
    status: 'ACTIVE',
    balance: 82000,
    createdAt: '2025-02-10T12:00:00Z',
    updatedAt: '2026-05-10T12:00:00Z',
  },
  {
    id: 'account-main-3',
    customerId: 'customer-1',
    accountNumber: '40817810000000000003',
    status: 'ACTIVE',
    balance: 34000,
    createdAt: '2025-03-15T12:00:00Z',
    updatedAt: '2026-05-15T12:00:00Z',
  },
];

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

function getGoalTransactions(goalId: string) {
  return TRANSACTIONS_MOCK.filter((transaction) => transaction.counterpartyName === goalId);
}

export const MOCK_GOAL_DETAILS: Record<string, GoalDetails> = {
  'goal-1': {
    id: 'goal-1',
    accountId: 'account-goal-1',
    name: 'На отпуск',
    targetAmount: 150000,
    currentAmount: 75000,
    deadline: '2026-08-01',
    createdAt: '2025-01-01T12:00:00Z',
    achievedAt: null,
    hardMode: false,
    status: 'active',
    autoPay: true,
    autoPayAccountId: 'account-main-1',
    billingCycle: 'monthly',
    billingInterval: 1,
    autoPayAmount: 10000,
    transactions: getGoalTransactions('goal-1'),
  },

  'goal-2': {
    id: 'goal-2',
    accountId: 'account-goal-2',
    name: 'Новый ноутбук',
    targetAmount: 200000,
    currentAmount: 50000,
    deadline: '2026-12-01',
    createdAt: '2025-06-15T09:30:00Z',
    achievedAt: null,
    hardMode: true,
    status: 'active',
    autoPay: false,
    autoPayAccountId: null,
    billingCycle: null,
    billingInterval: null,
    autoPayAmount: null,
    transactions: getGoalTransactions('goal-2'),
  },

  'goal-3': {
    id: 'goal-3',
    accountId: 'account-goal-3',
    name: 'Подушка безопасности',
    targetAmount: 500000,
    currentAmount: 500000,
    deadline: '2026-03-15',
    createdAt: '2024-03-10T15:45:00Z',
    achievedAt: '2026-03-15T10:30:00Z',
    hardMode: false,
    status: 'achieved',
    autoPay: false,
    autoPayAccountId: null,
    billingCycle: null,
    billingInterval: null,
    autoPayAmount: null,
    transactions: getGoalTransactions('goal-3'),
  },
};

export function getMockGoalDetails(goalId: string): GoalDetails | null {
  return MOCK_GOAL_DETAILS[goalId] ?? null;
}

export function createMockGoal(request: ApiCreateGoalRequest): GoalDetails {
  return {
    id: `goal-${Date.now()}`,
    accountId: `account-goal-${Date.now()}`,
    name: request.name,
    targetAmount: request.target_amount,
    currentAmount: 0,
    deadline: request.deadline,
    createdAt: dayjs().toISOString(),
    achievedAt: null,
    hardMode: request.hard_mode,
    status: 'active',
    autoPay: request.auto_pay,
    autoPayAccountId: request.auto_pay_account_id ?? null,
    billingCycle: request.billing_cycle ?? null,
    billingInterval: request.billing_interval ?? null,
    autoPayAmount: request.auto_pay_amount ?? null,
    transactions: [],
  };
}

export function mockDepositToGoal(goalId: string, request: ApiGoalTransactionRequest): GoalDetails {
  const goal = getMockGoalDetails(goalId);
  if (!goal) throw new Error(`Goal with id ${goalId} not found`);

  const currentAmount = goal.currentAmount + request.amount;
  const isAchieved = currentAmount >= goal.targetAmount;

  return {
    ...goal,
    currentAmount,
    status: isAchieved ? 'achieved' : goal.status,
    achievedAt: isAchieved ? dayjs().toISOString() : goal.achievedAt,
  };
}

export function mockWithdrawFromGoal(
  goalId: string,
  request: ApiGoalTransactionRequest,
): GoalDetails {
  const goal = getMockGoalDetails(goalId);
  if (!goal) throw new Error(`Goal with id ${goalId} not found`);

  const currentAmount = Math.max(0, goal.currentAmount - request.amount);

  return {
    ...goal,
    currentAmount,
    status: currentAmount >= goal.targetAmount ? 'achieved' : 'active',
    achievedAt: currentAmount >= goal.targetAmount ? goal.achievedAt : null,
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
      autoPayAccountId: null,
      billingCycle: null,
      billingInterval: null,
      autoPayAmount: null,
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
