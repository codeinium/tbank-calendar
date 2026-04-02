/**
 * Биллинговый цикл подписки
 */
export type BillingCycle = 'daily' | 'weekly' | 'monthly' | 'yearly';

/**
 * Статус подписки
 */
export type SubscriptionStatus = 'active' | 'completed' | 'paused' | 'cancelled';

/**
 * Подписка (subscription)
 */
export interface Subscription {
  /** UUID подписки */
  id: string;
  /** Название подписки */
  name: string;
  /** Описание */
  description: string;
  /** Сумма */
  amount: number;
  /** Название категории транзакции */
  category_name: string;
  /** Цвет категории */
  category_color: string;
  /** Цикл повторения */
  billing_cycle: BillingCycle;
  /** Интервал (по умолчанию 1) */
  billing_interval: number;
  /** Дата следующего списания */
  next_billing_date: string;
  /** Дата окончания */
  end_date: string | null;
  /** URL иконки сервиса */
  logo_url: string | null;
  /** Статус подписки */
  status: SubscriptionStatus;
}

/**
 * Модель для создания подписки (POST /api/v1/subscriptions)
 */
export interface CreateSubscriptionRequest {
  /** Название подписки */
  name: string;
  /** Описание */
  description: string;
  /** Сумма */
  amount: number;
  /** Название категории транзакции */
  category_name: string;
  /** Цикл повторения */
  billing_cycle: BillingCycle;
  /** Интервал (по умолчанию 1) */
  billing_interval?: number;
  /** Дата окончания */
  end_date?: string;
  /** URL иконки сервиса */
  logo_url?: string;
}
