import { GoalStatus } from '../../models/goal/goal.model';
import { BillingCycle } from '../../models/types/billing-cycle.type';
import { ApiTransaction } from '../transaction/transaction.api';

export interface ApiGoal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  status: GoalStatus;
}

export interface ApiGoalDetails extends ApiGoal {
  account_id: string;
  deadline: string;
  created_at: string;
  achieved_at: string | null;
  hard_mode: boolean;
  auto_pay: boolean;
  auto_pay_account_id?: string | null;
  billing_cycle?: BillingCycle | null;
  billing_interval?: number | null;
  auto_pay_amount?: number | null;
  transactions: ApiTransaction[];
}

export interface ApiCreateGoalRequest {
  name: string;
  target_amount: number;
  deadline: string;
  hard_mode: boolean;
  auto_pay: boolean;
  auto_pay_account_id?: string | null;
  billing_cycle?: BillingCycle | null;
  billing_interval?: number | null;
  auto_pay_amount?: number | null;
}

export interface ApiGoalTransactionRequest {
  amount: number;
  account_id: string;
}

export interface ApiUpdateGoalRequest {
  name: string;
  deadline: string;
}

export interface ApiUpdateGoalAutoPayRequest {
  is_active: boolean;
  auto_pay_account_id?: string | null;
  billing_cycle?: BillingCycle | null;
  billing_interval?: number | null;
  amount?: number | null;
}

export interface ApiGoalAccount {
  id: string;
  customer_id: string;
  account_number: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  balance: number;
  created_at: string;
  updated_at: string;
}