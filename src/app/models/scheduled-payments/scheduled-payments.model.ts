import { BillingCycle, Status } from '../types/billing-cycle.type';


export interface SheduledPayments {
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
  logoUrl: string;
  status: Status;
}
