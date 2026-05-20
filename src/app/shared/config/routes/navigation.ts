import { routes } from './routes';

export interface NavItem {
  label: string;
  to: string;
}

export const navigation: NavItem[] = [
  { label: 'Главная', to: routes.home },
  { label: 'Календарь', to: routes.calendar },
  { label: 'Статистика', to: routes.stats },
  { label: 'Цели', to: routes.goals },
  { label: 'Платежи', to: routes.payments },
  { label: 'Личный кабинет', to: routes.profile },
];

export const guestNavigation: NavItem[] = [
  {
    label: 'Главная',
    to: routes.home,
  },
  {
    label: 'Вход',
    to: routes.login,
  },
];
