import { Transaction } from '../model/transaction.model';
import { CATEGORIES_MOCK } from '../../category/api/category.mock';

export const TRANSACTIONS_MOCK: Transaction[] = [
  {
    id: '1',
    title: 'Зарплата',
    amount: 50000,
    type: 'income',
    date: '2026-03-04T14:30:00',
    category: CATEGORIES_MOCK[0],
  },
  {
    id: '2',
    title: 'Продукты',
    amount: 500,
    type: 'expense',
    date: '2026-03-04T14:31:00',
    category: CATEGORIES_MOCK[1],
  },
  {
    id: '3',
    title: 'Продукты',
    amount: 500,
    type: 'expense',
    date: '2026-03-06T14:31:00',
    category: CATEGORIES_MOCK[1],
  },
  {
    id: '4',
    title: 'Продукты',
    amount: 500,
    type: 'expense',
    date: '2026-03-06T14:31:00',
    category: CATEGORIES_MOCK[1],
  },
  {
    id: '5',
    title: 'Продукты',
    amount: 500,
    type: 'expense',
    date: '2026-03-06T14:31:00',
    category: CATEGORIES_MOCK[1],
  },
  {
    id: '6',
    title: 'Продукты',
    amount: 500,
    type: 'expense',
    date: '2026-03-06T14:31:00',
    category: CATEGORIES_MOCK[1],
  },
];
