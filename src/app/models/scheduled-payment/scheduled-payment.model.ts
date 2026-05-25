import { BillingCycle } from '../types/billing-cycle.type';
import { ReminderPaymentStatus } from '../types/status.type';

export interface SheduledPayment {
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
  status: ReminderPaymentStatus;
}

export interface CreateScheduledPaymentRequest {
  title: string;
  description: string | null;
  amount: number;
  categoryName: string;
  billingCycle: BillingCycle | null;
  billingInterval: number;
  endDate: string | null;
  nextBillingDate: string;
}

export interface UpdateScheduledPaymentRequest {
  title?: string | null;
  description?: string | null;
  amount?: number | null;
  categoryName?: string | null;
  billingCycle?: BillingCycle | null;
  billingInterval?: number | null;
  endDate?: string | null;
  nextBillingDate?: string | null;
}
