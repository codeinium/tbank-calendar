import { TransactionType } from '@/app/models/types/transaction.type';

export interface Transaction {
  id: string;
  counterpartyName: string;
  categoryName: string;
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
  categoryColor: string;
}
