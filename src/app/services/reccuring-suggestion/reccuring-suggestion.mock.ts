import { RecurringSuggestion } from "@/app/models/recurring-suggestion/recurring-suggestion.model";

export const MOCK_RECURRING_SUGGESTIONS: RecurringSuggestion[] = [
  {
    counterpartyName: 'Netflix',
    amount: 799,
    category: 'Интернет-сервисы',
    suggestedBillingCycle: 'monthly',
    confidence: 87,
  },
  {
    counterpartyName: 'пупупу',
    amount: 199,
    category: 'Развлечения',
    suggestedBillingCycle: 'monthly',
    confidence: 79,
  },
];
