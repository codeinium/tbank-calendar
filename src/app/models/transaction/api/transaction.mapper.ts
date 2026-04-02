import { Transaction } from '../model/transaction.model';
import { ApiTransaction } from './transaction.api';

/**
 * Маппинг API транзакции в модель
 */
export function mapTransaction(api: ApiTransaction): Transaction {
  return {
    id: api.id,
    from_account_name: api.from_account_name,
    to_account_name: api.to_account_name,
    counterparty_name: api.counterparty_name,
    category_name: api.category_name,
    amount: api.amount,
    type: api.type,
    transaction_date: api.transaction_date,
    description: api.description,
    category_color: api.category_color,
  };
}
