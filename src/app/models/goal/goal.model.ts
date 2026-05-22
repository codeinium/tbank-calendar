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

export interface GoalTransactionRequest {
  amount: number;
  accountId: string;
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

export interface GoalAccount {
  id: string;
  customerId: string;
  accountNumber: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  balance: number;
  createdAt: string;
  updatedAt: string;
}