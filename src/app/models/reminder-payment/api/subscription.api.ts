import { BillingCycle, SubscriptionStatus } from '../model/subscription.model';

/**
 * API модель подписки (ответ от сервера)
 */
export interface ApiSubscription {
  id: string;
  name: string;
  description: string;
  amount: number;
  category_name: string;
  category_color: string;
  billing_cycle: BillingCycle;
  billing_interval: number;
  next_billing_date: string;
  end_date: string | null;
  logo_url: string | null;
  status: SubscriptionStatus;
}

/**
 * API модель для создания подписки (запрос на сервер)
 */
export interface ApiCreateSubscriptionRequest {
  name: string;
  description: string;
  amount: number;
  category_name: string;
  billing_cycle: BillingCycle;
  billing_interval?: number;
  end_date?: string;
  logo_url?: string;
}
