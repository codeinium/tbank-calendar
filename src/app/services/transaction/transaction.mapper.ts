import { ApiTransaction } from './transaction.api';
import { Transaction } from '../../models/transaction/transaction.model';

export function mapTransaction(api: ApiTransaction): Transaction {
  return {
    id: api.id,
    counterpartyName: api.counterparty,
    categoryName: api.category_name,
    amount: api.amount,
    type: api.type,
    date: api.transaction_date,
    description: api.description,
    categoryColor: api.category_color,
  };
}
