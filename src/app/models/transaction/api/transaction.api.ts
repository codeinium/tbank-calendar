export interface ApiTransaction {
  id: string;
  account_id: string;
  category_id: string;
  amount: number;
  type: 'income' | 'expense';
  transaction_date: string;
  description: string;
  created_at: string;
}
