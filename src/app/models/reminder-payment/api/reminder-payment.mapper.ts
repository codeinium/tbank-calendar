import { Subscription } from '../model/subscription.model';
import { ScheduledPayment } from '../model/scheduled-payment.model';
import { ApiSubscription } from './subscription.api';
import { ApiScheduledPayment } from './scheduled-payment.api';

/**
 * Маппинг API подписки в модель подписки
 */
export function mapSubscription(api: ApiSubscription): Subscription {
  return {
    id: api.id,
    name: api.name,
    description: api.description,
    amount: api.amount,
    category_name: api.category_name,
    category_color: api.category_color,
    billing_cycle: api.billing_cycle,
    billing_interval: api.billing_interval,
    next_billing_date: api.next_billing_date,
    end_date: api.end_date,
    logo_url: api.logo_url,
    status: api.status,
  };
}

/**
 * Маппинг API запланированного платежа в модель
 */
export function mapScheduledPayment(api: ApiScheduledPayment): ScheduledPayment {
  return {
    id: api.id,
    title: api.title,
    description: api.description,
    amount: api.amount,
    category_name: api.category_name,
    category_color: api.category_color,
    frequency: api.frequency,
    interval: api.interval,
    next_payment_at: api.next_payment_at,
    end_date: api.end_date,
    logo_url: api.logo_url,
    status: api.status,
  };
}
