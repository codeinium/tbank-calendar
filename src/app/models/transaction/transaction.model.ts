export interface Transaction {
  id: string;
  fromAccountName: string;
  toAccountName?: string | null;
  counterpartyName?: string | null;
  categoryName: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  description: string;
  categoryColor: string;
}

export type transactionType = 'income' | 'expense';