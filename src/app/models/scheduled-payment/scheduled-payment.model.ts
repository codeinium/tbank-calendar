import { BillingCycle } from '../types/billing-cycle.type';
import { ReminderPaymentStatus } from '../types/status.type';

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
  status: ReminderPaymentStatus;
}

export interface CreateScheduledPaymentRequest {
  title: string;
  description: string;
  amount: number;
  categoryName: string;
  billingCycle: BillingCycle;
  billingInterval: number;
  endDate: string;
  nextBillingDate: string;
}
