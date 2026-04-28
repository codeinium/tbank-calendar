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

export interface ApiSheduledPayments {
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



