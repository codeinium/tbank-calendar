import { TransactionType } from "@/app/shared/types/transaction.type";

export interface Transaction {
  id: string;
  fromAccountName: string;
  toAccountName?: string | null;
  counterpartyName?: string | null;
  categoryName: string;
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
  categoryColor: string;
}

