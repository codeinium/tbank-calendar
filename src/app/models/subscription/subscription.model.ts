import { BillingCycle } from '../types/billing-cycle.type';
import { Status } from '../types/status.type';

export interface Subscription {
  id: string;
  title: string;
  description: string;
  amount: number;
  categoryName: string;
  categoryColor: string;
  billingCycle: BillingCycle;
  billingInterval: number;
  nextBillingDate: string;
  endDate: string;
  logoUrl?: string;
  status: Status;
}

export interface CreateSubscriptionRequest {
  title: string;
  description: string;
  amount: number;
  categoryName: string;
  billingCycle: BillingCycle;
  billingInterval: number;
  endDate: string;
  nextBillingDate: string;
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
