import {
  RecurringSuggestion,
  RejectRecurringSuggestionRequest,
} from '@/app/models/recurring-suggestion/recurring-suggestion.model';
import {
  ApiRecurringSuggestion,
  ApiRejectRecurringSuggestionRequest,
} from './reccuring-suggestion.api';

export function mapRecurringSuggestion(api: ApiRecurringSuggestion): RecurringSuggestion {
  return {
    counterpartyName: api.counterparty_name,
    amount: api.amount,
    category: api.category,
    suggestedBillingCycle: api.suggested_billing_cycle,
    confidence: api.confidence,
  };
}

export function mapRejectRecurringSuggestionRequest(
  model: RejectRecurringSuggestionRequest,
): ApiRejectRecurringSuggestionRequest {
    return {
        counterparty_name: model.counterpartyName
    }
}
