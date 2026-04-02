import { GoalStatus, BillingCycle } from '../model/goal.model';

/**
 * API модель цели (краткая версия для списка)
 */
export interface ApiGoal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  status: GoalStatus;
}

/**
 * API модель цели (полная версия)
 */
export interface ApiGoalDetails {
  id: string;
  account_id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  achieved_at: string | null;
  hard_mode: boolean;
  status: GoalStatus;
  auto_pay: boolean;
}

/**
 * API модель для создания цели
 */
export interface ApiCreateGoalRequest {
  name: string;
  target_amount: number;
  deadline?: string;
  hard_mode?: boolean;
  auto_pay?: boolean;
  account_id?: string;
  billing_cycle?: BillingCycle;
  billing_interval?: number;
  auto_pay_amount?: number;
}

/**
 * API модель для транзакции по цели (deposit/withdraw)
 */
export interface ApiGoalTransactionRequest {
  amount: number;
  account_id: string;
}

/**
 * API модель для обновления автопополнения
 */
export interface ApiUpdateGoalAutoPayRequest {
  goal_id: string;
  is_active: boolean;
  account_id?: string;
  billing_cycle?: BillingCycle;
  billing_interval?: number;
  amount?: number;
}
