import { BillingCycle } from '../types/billing-cycle.type';

export interface RecurringSuggestion {
  counterpartyName: string;
  amount: number;
  category: string;
  suggestedBillingCycle: BillingCycle;
  confidence: number;
}

export interface RejectRecurringSuggestionRequest {
  counterpartyName: string;
}
