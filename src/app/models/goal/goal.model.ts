import { Transaction } from '../transaction/transaction.model';
import { BillingCycle } from '../types/billing-cycle.type';

export type GoalStatus = 'active' | 'achieved' | 'closed' | 'forfeited';

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  status: GoalStatus;
}

export interface GoalDetails extends Goal {
  accountId: string;
  deadline: string;
  createdAt: string;
  achievedAt: string | null;
  hardMode: boolean;
  autoPay: boolean;
  autoPayAccountId?: string | null;
  billingCycle?: BillingCycle | null;
  billingInterval?: number | null;
  autoPayAmount?: number | null;
  transactions: Transaction[];
}

export interface CreateGoalRequest {
  refundAccountId: string;
  name: string;
  targetAmount: number;
  deadline: string;
  hardMode: boolean;
  autoPay: boolean;
  autoPayAccountId?: string | null;
  billingCycle?: BillingCycle | null;
  billingInterval?: number | null;
  autoPayAmount?: number | null;
}

export interface GoalContributeRequest {
  accountId: string;
  amount: number;
}

export interface GoalWithdrawRequest {
  amount: number;
}

export interface UpdateGoalRequest {
  name: string;
  deadline: string;
}

export interface UpdateGoalAutoPayRequest {
  isActive: boolean;
  autoPayAccountId?: string | null;
  billingCycle?: BillingCycle | null;
  billingInterval?: number | null;
  amount?: number | null;
}
