/**
 * Частота платежа
 */
export type PaymentFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

/**
 * Статус запланированного платежа
 */
export type ScheduledPaymentStatus = 'active' | 'paused' | 'cancelled' | 'completed';

/**
 * Запланированный платеж (scheduled_payment)
 */
export interface ScheduledPayment {
  /** UUID платежа */
  id: string;
  /** Название */
  title: string;
  /** Описание */
  description: string;
  /** Сумма */
  amount: number;
  /** Название категории транзакции */
  category_name: string;
  /** Цвет категории */
  category_color: string;
  /** Частота */
  frequency: PaymentFrequency;
  /** Интервал (по умолчанию 1) */
  interval: number;
  /** Дата следующего срабатывания */
  next_payment_at: string;
  /** Дата окончания */
  end_date: string | null;
  /** URL иконки сервиса */
  logo_url: string | null;
  /** Статус */
  status: ScheduledPaymentStatus;
}

/**
 * Модель для создания запланированного платежа (POST /api/v1/scheduled-payments)
 */
export interface CreateScheduledPaymentRequest {
  /** Название */
  title: string;
  /** Описание */
  description: string;
  /** Сумма */
  amount: number;
  /** Название категории транзакции */
  category_name: string;
  /** Частота */
  frequency: PaymentFrequency;
  /** Интервал (по умолчанию 1) */
  interval?: number;
  /** Дата окончания */
  end_date?: string;
  /** URL иконки сервиса */
  logo_url?: string;
}
