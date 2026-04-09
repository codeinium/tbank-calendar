import { ApiTransaction } from './transaction.api';
import { Transaction } from '../model/transaction.model';

export function mapTransaction(api: ApiTransaction): Transaction {
  return {
    id: api.id,
    fromAccountName: api.from_account_name,
    toAccountName: api.to_account_name,
    counterpartyName: api.counterparty_name,
    categoryName: api.category_name,
    amount: api.amount,
    type: api.type,
    date: api.transaction_date,
    description: api.description,
    categoryColor: api.category_color,
  };
}
