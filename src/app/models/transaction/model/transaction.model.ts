import { Category } from "../../category/model/category.model";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: Category;
}
