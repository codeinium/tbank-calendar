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
  billing_cycle?: number | null;
  billing_interval?: BillingCycle | null;

  auto_pay_amount?: number | null;
  transactions: ApiTransaction[];
}

export interface ApiCreateGoalRequest {
  refund_account_id: string;
  name: string;
  target_amount: number;
  deadline: string;
  hard_mode: boolean;
  auto_pay: boolean;
  auto_pay_account_id?: string | null;

  // отправляем как хочет бек
  billing_cycle?: number | null;
  billing_interval?: BillingCycle | null;

  auto_pay_amount?: number | null;
}

export interface ApiGoalContributeRequest {
  from_account_id: string;
  amount: number;
}

export interface ApiGoalWithdrawRequest {
  amount: number;
}

export interface ApiUpdateGoalRequest {
  name: string;
  deadline: string;
}

export interface ApiUpdateGoalAutoPayRequest {
  auto_pay: boolean;
  auto_pay_account_id?: string | null;
  billing_cycle?: number | null;
  billing_interval?: BillingCycle | null;

  auto_pay_amount?: number | null;
}
