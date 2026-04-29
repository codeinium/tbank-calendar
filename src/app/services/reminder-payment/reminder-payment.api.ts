import { BillingCycle, Status } from '../../models/types/billing-cycle.type';


export interface ApiSubsription {
  id: string;
  name: string;
  description: string;
  amount: number;
  category_name: string;
  category_color: string;
  billing_cycle: BillingCycle;
  billing_interval: number;
  next_billing_date: string;
  end_date: string;
  logo_url?: string;
  status: Status;
}

export interface ApiScheduledPayments {
  id: string;
  title: string;
  description: string;
  amount: number;
  category_name: string;
  category_color: string;
  frequency: BillingCycle;
  interval: number;
  next_payment_at: string;
  end_date: string;
  logo_url?: string;
  status: Status;
}

export interface ApiCreateScheduledPaymentRequest {
  title: string;
  description: string;
  amount: number;
  category_name: string;
  frequency: BillingCycle;
  interval: number;
  end_date: string;
}

export interface ApiCreateSubscriptionRequest {
  name: string;
  description: string;
  amount: number;
  category_name: string;
  billing_cycle: BillingCycle;
  billing_interval: number;
  end_date: string;
}
