import {
  CreateScheduledPaymentRequest,
  SheduledPayment,
} from '@/app/models/scheduled-payment/scheduled-payment.model';
import {
  CreateSubscriptionRequest,
  StatisticSubscriptions,
  Subscription,
} from '@/app/models/subscription/subscription.model';
import { BillingCycle } from '@/app/models/types/billing-cycle.type';
import { ReminderPaymentStatus } from '@/app/models/types/status.type';

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
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/500px-Netflix_icon.svg.png?_=20220806170125',
    status: 'active' as ReminderPaymentStatus,
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
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'active' as ReminderPaymentStatus,
  },
  {
    id: '3',
    title: 'Yandex music',
    description: 'Музыка',
    amount: 199,
    categoryName: 'Развлечения',
    categoryColor: '#1DB954',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-06-15T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'active' as ReminderPaymentStatus,
  },
  {
    id: '4',
    title: 'Yandex music',
    description: 'Музыка',
    amount: 199,
    categoryName: 'Развлечения',
    categoryColor: '#1DB954',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-06-15T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'active' as ReminderPaymentStatus,
  },
  {
    id: '5',
    title: 'Yandex music',
    description: 'Музыка',
    amount: 199,
    categoryName: 'Развлечения',
    categoryColor: '#1DB954',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-06-15T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'active' as ReminderPaymentStatus,
  },
  {
    id: '6',
    title: 'Yandex music',
    description: 'Музыка',
    amount: 199,
    categoryName: 'Развлечения',
    categoryColor: '#1DB954',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-06-15T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'active' as ReminderPaymentStatus,
  },
  {
    id: '7',
    title: 'Yandex music',
    description: 'Музыка',
    amount: 199,
    categoryName: 'Развлечения',
    categoryColor: '#1DB954',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-06-15T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'active' as ReminderPaymentStatus,
  },
  {
    id: '8',
    title: 'Yandex music',
    description: 'Музыка',
    amount: 199,
    categoryName: 'Развлечения',
    categoryColor: '#1DB954',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-06-15T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'active' as ReminderPaymentStatus,
  },
  {
    id: '9',
    title: 'Yandex music',
    description: 'Музыка',
    amount: 199,
    categoryName: 'Развлечения',
    categoryColor: '#1DB954',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-06-15T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'active' as ReminderPaymentStatus,
  },
];

export const MOCK_SCHEDULED_PAYMENTS: SheduledPayment[] = [
  {
    id: '9',
    title: 'Yandex music',
    description: 'Музыка',
    amount: 199,
    categoryName: 'Развлечения',
    categoryColor: '#1DB954',
    billingCycle: 'monthly' as BillingCycle,
    billingInterval: 1,
    nextBillingDate: '2026-06-15T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'active' as ReminderPaymentStatus,
  },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

export function createMockSubscription(request: CreateSubscriptionRequest): Subscription {
  return {
    id: generateId(),
    title: request.title,
    description: request.description,
    amount: request.amount,
    categoryName: request.categoryName,
    categoryColor: '#CCCCCC',
    billingCycle: request.billingCycle,
    billingInterval: request.billingInterval,
    nextBillingDate: request.nextBillingDate,
    endDate: request.endDate,
    logoUrl: '',
    status: 'active' as ReminderPaymentStatus,
  };
}

export function createMockScheduledPayment(
  request: CreateScheduledPaymentRequest,
): SheduledPayment {
  return {
    id: generateId(),
    title: request.title,
    description: request.description,
    amount: request.amount,
    categoryName: request.categoryName,
    categoryColor: '#CCCCCC',
    billingCycle: request.billingCycle,
    billingInterval: request.billingInterval,
    nextBillingDate: request.nextBillingDate,
    endDate: request.endDate,
    logoUrl: '',
    status: 'pending' as ReminderPaymentStatus,
  };
}

export const MOCK_UPCOMING_SUBSCRIPTIONS: StatisticSubscriptions = {
  totalAmount: 2400,
  averageAmount: 600,

  items: [
    {
      id: '1',
      name: 'Netflix',
      nextPaymentDate: '2026-05-15',
      amount: 999,
      iconUrl: '',
    },
    {
      id: '2',
      name: 'Spotify',
      nextPaymentDate: '2026-05-18',
      amount: 499,
      iconUrl: '',
    },
  ],
};
