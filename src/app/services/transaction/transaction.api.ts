export interface ApiTransaction {
  id: string;
  from_account_name: string;
  to_account_name?: string | null;
  counterparty_name?: string | null;
  category_name: string;
  amount: number;
  type: 'income' | 'expense';
  transaction_date: string;
  description: string;
  category_color: string;
}
