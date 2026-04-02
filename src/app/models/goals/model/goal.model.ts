/**
 * Статус цели
 */
export type GoalStatus = 'active' | 'achieved' | 'closed' | 'forfeited';

/**
 * Биллинговый цикл для автопополнения
 */
export type BillingCycle = 'daily' | 'weekly' | 'monthly' | 'yearly';

/**
 * Финансовая цель (goal) - краткая версия для списка
 */
export interface Goal {
  /** UUID цели */
  id: string;
  /** Название цели */
  name: string;
  /** Целевая сумма */
  target_amount: number;
  /** Текущая сумма */
  current_amount: number;
  /** Статус цели */
  status: GoalStatus;
}

/**
 * Финансовая цель - полная версия (для детального просмотра)
 */
export interface GoalDetails extends Goal {
  /** UUID счёта, куда приходят деньги */
  account_id: string;
  /** Дедлайн */
  deadline: string | null;
  /** Дата достижения (null - если не достигнута) */
  achieved_at: string | null;
  /** Хард мод (строгий режим) */
  hard_mode: boolean;
  /** Автопополнение включено */
  auto_pay: boolean;
}

/**
 * Запрос на создание цели (POST /api/v1/goals)
 */
export interface CreateGoalRequest {
  /** Название цели */
  name: string;
  /** Целевая сумма */
  target_amount: number;
  /** Дедлайн */
  deadline?: string;
  /** Хард мод (по умолчанию false) */
  hard_mode?: boolean;
  /** Автопополнение */
  auto_pay?: boolean;
  /** UUID счёта */
  account_id?: string;
  /** Биллинговый цикл */
  billing_cycle?: BillingCycle;
  /** Биллинговый интервал */
  billing_interval?: number;
  /** Сумма автопополнения */
  auto_pay_amount?: number;
}

/**
 * Запрос на пополнение/снятие (POST /api/v1/goals/{goalId}/deposit, /withdraw)
 */
export interface GoalTransactionRequest {
  /** Сумма */
  amount: number;
  /** UUID счёта */
  account_id: string;
}

/**
 * Запрос на изменение автопополнения (PATCH /api/v1/goals/{goalId}/auto-pay)
 */
export interface UpdateGoalAutoPayRequest {
  /** UUID цели */
  goal_id: string;
  /** Активно ли автопополнение */
  is_active: boolean;
  /** UUID счёта */
  account_id?: string;
  /** Биллинговый цикл */
  billing_cycle?: BillingCycle;
  /** Биллинговый интервал */
  billing_interval?: number;
  /** Сумма */
  amount?: number;
}
