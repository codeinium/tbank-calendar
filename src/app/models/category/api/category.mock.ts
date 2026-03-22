import { Category } from '../model/category.model';

export const CATEGORIES_MOCK: Category[] = [
  {
    id: '1',
    name: 'Зарплата',
    type: 'income',
    color: '#4CAF50',
    icon: 'salary',
  },
  {
    id: '2',
    name: 'Продукты',
    type: 'expense',
    color: '#FF5722',
    icon: 'cart',
  },
];
