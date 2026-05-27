import { TransactionType } from '@/app/models/types/transaction.type';

export interface ApiTransaction {
  id: string;
  counterparty: string;
  category_name: string;
  amount: number;
  type: TransactionType;
  transaction_date: string;
  description: string;
  category_color: string;
}
