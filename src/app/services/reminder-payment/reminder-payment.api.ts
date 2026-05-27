import { BillingCycle } from '../../models/types/billing-cycle.type';
import { ReminderPaymentStatus } from '@/app/models/types/status.type';

export interface ApiSubscription {
  id: string;
  name: string;
  description: string | null;
  amount: number;
  category_name: string | null;
  category_color: string | null;
  billing_cycle: BillingCycle | null;
  billing_interval: number;
  next_billing_date: string;
  end_date: string | null;
  logo_url: string | null;
  status: ReminderPaymentStatus;
}

export interface ApiScheduledPayments {
  id: string;
  title: string;
  description: string | null;
  amount: number;
  category_name: string | null;
  category_color: string | null;
  frequency: BillingCycle | null;
  interval: number;
  next_payment_at: string;
  end_date: string | null;
  status: ReminderPaymentStatus;
}

export interface ApiCreateScheduledPaymentRequest {
  title: string;
  description: string | null;
  amount: number;
  category_name: string;
  frequency: BillingCycle | null;
  interval: number;
  end_date: string | null;
  next_payment_at: string;
}

export interface ApiCreateSubscriptionRequest {
  name: string;
  description: string | null;
  amount: number;
  category_name: string;
  billing_cycle: BillingCycle | null;
  billing_interval: number;
  end_date: string | null;
  next_billing_date: string;
}

export interface ApiUpdateSubscriptionRequest {
  name?: string | null;
  description?: string | null;
  amount?: number | null;
  category_name?: string | null;
  billing_cycle?: BillingCycle | null;
  billing_interval?: number | null;
  end_date?: string | null;
  next_billing_date?: string | null;
  logo_url?: string | null;
}

export interface ApiUpdateScheduledPaymentRequest {
  title?: string | null;
  description?: string | null;
  amount?: number | null;
  category_name?: string | null;
  frequency?: BillingCycle | null;
  interval?: number | null;
  end_date?: string | null;
  next_payment_at?: string | null;
}

export interface ApiStatisticSubscriptions {
  total_amount: number;
  average_cost: number;
  items: ApiStatisticSubscriptionsItem[];
}

export interface ApiStatisticSubscriptionsItem {
  id: string;
  name: string;
  next_payment_date: string;
  amount: number;
  icon_url?: string;
}
