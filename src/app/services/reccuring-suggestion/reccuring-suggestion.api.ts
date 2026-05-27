import { BillingCycle } from "@/app/models/types/billing-cycle.type";

export interface ApiRecurringSuggestion {
  counterparty_name: string;
  amount: number;
  category: string;
  suggested_billing_cycle: BillingCycle;
  confidence: number;
}

export interface ApiRejectRecurringSuggestionRequest {
  counterparty_name: string;
}
