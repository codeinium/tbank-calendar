import { ApiTransaction } from './transaction.api';
import { Transaction } from '../model/transaction.model';
import { Category } from '../../category/model/category.model';

export function mapTransaction(
  api: ApiTransaction,
  categoryMap: Map<string, Category>,
): Transaction {
  return {
    id: api.id,
    title: api.description,
    amount: api.amount,
    type: api.type,
    date: api.transaction_date,
    category: categoryMap.get(api.category_id)!,
  };
}