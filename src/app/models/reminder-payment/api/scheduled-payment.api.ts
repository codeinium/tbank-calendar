import { PaymentFrequency, ScheduledPaymentStatus } from '../model/scheduled-payment.model';

/**
 * API модель запланированного платежа (ответ от сервера)
 */
export interface ApiScheduledPayment {
  id: string;
  title: string;
  description: string;
  amount: number;
  category_name: string;
  category_color: string;
  frequency: PaymentFrequency;
  interval: number;
  next_payment_at: string;
  end_date: string | null;
  logo_url: string | null;
  status: ScheduledPaymentStatus;
}

/**
 * API модель для создания запланированного платежа (запрос на сервер)
 */
export interface ApiCreateScheduledPaymentRequest {
  title: string;
  description: string;
  amount: number;
  category_name: string;
  frequency: PaymentFrequency;
  interval?: number;
  end_date?: string;
  logo_url?: string;
}
