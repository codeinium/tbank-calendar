import { BillingCycle } from '../types/billing-cycle.type';

export type GoalStatus = 'active' | 'achieved' | 'closed' | 'forfeited';

/* для списка */
export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  status: GoalStatus;
}

/* полная версия */
export interface GoalDetails extends Goal {
  accountId: string;
  createdAt: string;
  deadline: string;
  achievedAt: string | null;
  hardMode: boolean;
  autoPay: boolean;
  autoPayAccountId?: string;
  billingCycle?: BillingCycle;
  billingInterval?: number;
  autoPayAmount?: number;
}

/* создание цели */
export interface CreateGoalRequest {
  name: string;
  targetAmount: number;
  deadline: string;
  hardMode: boolean;
  autoPay: boolean;
  autoPayAccountId?: string;
  billingCycle?: BillingCycle;
  billingInterval?: number;
  autoPayAmount?: number;
}

/* пополнение/снятие */
export interface GoalTransactionRequest {
  id: string;
  amount: number;
  accountId: string;
}

/* изменение цели (название, дедлайн) */
export interface UpdateGoalRequest {
  id: string;
  name: string;
  deadline: string;
}

/* изменение цели (автопополнение) */
export interface UpdateGoalAutoPayRequest {
  id: string;
  isActive: boolean;
  autoPayAccountId?: string;
  billingCycle?: BillingCycle;
  billingInterval?: number;
  amount?: number;
}

export interface ChartDataPoint {
  period: string;
  label: string;
  deposits: number;
  withdrawals: number;
  percent: number;
  isNegative: boolean;
}

export type ChartRange = 'days' | 'months' | 'years';
