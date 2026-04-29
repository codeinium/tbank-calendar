import { BillingCycle, Status } from '../types/billing-cycle.type';

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
}