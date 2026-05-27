import { BillingCycle } from '../types/billing-cycle.type';
import { ReminderPaymentStatus } from '../types/status.type';

export interface Subscription {
  id: string;
  title: string;
  description: string | null;
  amount: number;
  categoryName: string | null;
  categoryColor: string | null;
  billingCycle: BillingCycle | null;
  billingInterval: number;
  nextBillingDate: string;
  endDate: string | null;
  logoUrl?: string | null;
  status: ReminderPaymentStatus;
}

export interface CreateSubscriptionRequest {
  title: string;
  description: string | null;
  amount: number;
  categoryName: string;
  billingCycle: BillingCycle | null;
  billingInterval: number;
  endDate: string | null;
  nextBillingDate: string;
}

export interface UpdateSubscriptionRequest {
  title?: string | null;
  description?: string | null;
  amount?: number | null;
  categoryName?: string | null;
  billingCycle?: BillingCycle | null;
  billingInterval?: number | null;
  endDate?: string | null;
  nextBillingDate?: string | null;
  logoUrl?: string | null;
}

export interface StatisticSubscriptions {
  totalAmount: number;
  averageAmount: number;
  items: StatisticSubscriptionsItem[];
}

export interface StatisticSubscriptionsItem {
  id: string;
  name: string;
  nextPaymentDate: string;
  amount: number;
  iconUrl?: string;
}
