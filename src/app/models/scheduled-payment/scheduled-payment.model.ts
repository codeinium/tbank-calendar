import { BillingCycle } from '../types/billing-cycle.type';
import { Status } from '../types/status.type';

export interface SheduledPayment {
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

export interface CreateScheduledPaymentRequest {
  title: string;
  description: string;
  amount: number;
  categoryName: string;
  billingCycle: BillingCycle;
  billingInterval: number;
  endDate: string;
}
