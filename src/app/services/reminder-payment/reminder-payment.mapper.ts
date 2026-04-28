import { ApiSheduledPayments, ApiSubsription } from './reminder-payment.api';
import { SheduledPayment } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { Subscription } from '@/app/models/subscription/subscription.model';

export function mapSubscription(api: ApiSubsription): Subscription {
  return {
    id: api.id,
    title: api.name,
    description: api.description,
    amount: api.amount,
    categoryName: api.category_name,
    categoryColor: api.category_color,
    billingCycle: api.billing_cycle,
    billingInterval: api.billing_interval,
    nextBillingDate: api.next_billing_date,
    endDate: api.end_date,
    logoUrl: api.logo_url,
    status: api.status,
  };
}

export function mapSheduledPayments(api: ApiSheduledPayments): SheduledPayment {
  return {
    id: api.id,
    title: api.title,
    description: api.description,
    amount: api.amount,
    categoryName: api.category_name,
    categoryColor: api.category_color,
    billingCycle: api.frequency,
    billingInterval: api.interval,
    nextBillingDate: api.next_payment_at,
    endDate: api.end_date,
    logoUrl: api.logo_url,
    status: api.status,
  };
}
