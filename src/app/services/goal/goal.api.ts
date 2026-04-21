import { GoalStatus, BillingCycle } from '../../models/goal/goal.model';

/* для списка */
export interface ApiGoal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  status: GoalStatus;
}

/* полная версия */
export interface ApiGoalDetails {
  id: string;
  account_id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  created_at: string;
  achieved_at: string | null;
  hard_mode: boolean;
  status: GoalStatus;
  auto_pay: boolean;
}

/* создание новой цели */
export interface ApiCreateGoalRequest {
  name: string;
  target_amount: number;
  deadline: string;
  hard_mode: boolean;
  auto_pay: boolean;
  account_id?: string;
  billing_cycle?: BillingCycle;
  billing_interval?: number;
  auto_pay_amount?: number;
}

/* пополнение/снятие */
export interface ApiGoalTransactionRequest {
  id: string;
  amount: number;
  account_id: string;
}

/* изменение цели (название, дедлайн) */
export interface ApiUpdateGoalRequest {
  id: number;
  name: string;
  deadline: string;
}

/* изменение цели (автопополнение) */
export interface ApiUpdateGoalAutoPayRequest {
  id: string;
  is_active: boolean;
  account_id?: string;
  billing_cycle?: BillingCycle;
  billing_interval?: number;
  amount?: number;
}
