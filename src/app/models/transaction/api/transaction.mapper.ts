import { ApiTransaction } from './transaction.api';
import { Transaction } from '../model/transaction.model';
import { Category } from '../../category/model/category.model';

export function mapTransaction(api: ApiTransaction, categories: Category[]): Transaction {
  const category = categories.find((c) => c.id === api.category_id);

  return {
    id: api.id,
    title: api.description,
    amount: api.amount,
    type: api.type,
    date: api.transaction_date,
    category: category!,
  };
}
