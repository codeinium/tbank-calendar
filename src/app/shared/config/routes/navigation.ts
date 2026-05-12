import { routes } from './routes';

export interface NavItem {
  label: string;
  to: string;
}

export const navigation = [
  { label: 'Главная', to: routes.home },
  { label: 'Календарь', to: routes.calendar },
  { label: 'Статистика', to: routes.stats },
  { label: 'Цели', to: routes.goals },
  { label: 'Платежи', to: routes.payments },
];
