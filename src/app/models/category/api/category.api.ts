export interface ApiCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon_path: string;
  created_at: string;
}
