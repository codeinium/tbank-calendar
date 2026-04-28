import { SheduledPayment } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { Subscription } from '@/app/models/subscription/subscription.model';
import { BillingCycle, Status } from '@/app/models/types/billing-cycle.type';

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    title: 'Netflix',
    description: 'Базовая подписка',
    amount: 999,
    categoryName: 'Развлечения',
    categoryColor: '#E50914',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-04-29T00:00:00.000Z',
    endDate: '2027-05-26T00:00:00.000Z',
    logoUrl: 'https://logo.clearbit.com/netflix.com',
    status: 'active' as Status,
  },
  {
    id: '2',
    title: 'Yandex music',
    description: 'Музыка',
    amount: 199,
    categoryName: 'Развлечения',
    categoryColor: '#1DB954',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-06-15T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://logo.clearbit.com/spotify.com',
    status: 'active' as Status,
  },
];

export const MOCK_SCHEDULED_PAYMENTS: SheduledPayment[] = [
  {
    id: '101',
    title: 'Спортзал',
    description: 'Ежемесячная платаза за посещение зала',
    amount: 800,
    categoryName: 'Здоровье & Фитнесс',
    categoryColor: '#FF6B6B',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-06-01T00:00:00.000Z',
    endDate: '2026-12-01T00:00:00.000Z',
    logoUrl: 'https://logo.clearbit.com/gym.com',
    status: 'active' as Status,
  },
  {
    id: '102',
    title: 'ЖКХ',
    description: 'Жилищно-коммунальное хозяйство',
    amount: 4500,
    categoryName: 'Коммунальные платежи',
    categoryColor: '#4A90E2',
    billingCycle: 'yearly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2027-01-01T00:00:00.000Z',
    endDate: '2028-01-01T00:00:00.000Z',
    logoUrl: 'https://logo.clearbit.com/apple.com',
    status: 'active' as Status,
  },
];
