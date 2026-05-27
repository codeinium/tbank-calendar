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
import { UpdateScheduledPaymentRequest } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { UpdateSubscriptionRequest } from '@/app/models/subscription/subscription.model';

export function deleteMockSubscription(id: string): void {
  const index = MOCK_SUBSCRIPTIONS.findIndex((item) => item.id === id);

  if (index !== -1) {
    MOCK_SUBSCRIPTIONS.splice(index, 1);
  }
}

export function pauseMockSubscription(id: string): Subscription | undefined {
  const subscription = MOCK_SUBSCRIPTIONS.find((item) => item.id === id);

  if (subscription) {
    subscription.status = 'PAUSED' as ReminderPaymentStatus;
  }

  return subscription;
}

export function resumeMockSubscription(id: string): Subscription | undefined {
  const subscription = MOCK_SUBSCRIPTIONS.find((item) => item.id === id);

  if (subscription) {
    subscription.status = 'ACTIVE' as ReminderPaymentStatus;
  }

  return subscription;
}

export function updateMockSubscription(
  id: string,
  request: UpdateSubscriptionRequest,
): Subscription | undefined {
  const subscription = MOCK_SUBSCRIPTIONS.find((item) => item.id === id);

  if (!subscription) {
    return undefined;
  }

  return Object.assign(subscription, {
    title: request.title ?? subscription.title,
    description: request.description ?? subscription.description,
    amount: request.amount ?? subscription.amount,
    categoryName: request.categoryName ?? subscription.categoryName,
    billingCycle: request.billingCycle ?? subscription.billingCycle,
    billingInterval: request.billingInterval ?? subscription.billingInterval,
    endDate: request.endDate ?? subscription.endDate,
    nextBillingDate: request.nextBillingDate ?? subscription.nextBillingDate,
    logoUrl: request.logoUrl ?? subscription.logoUrl,
  });
}

export function deleteMockScheduledPayment(id: string): void {
  const index = MOCK_SCHEDULED_PAYMENTS.findIndex((item) => item.id === id);

  if (index !== -1) {
    MOCK_SCHEDULED_PAYMENTS.splice(index, 1);
  }
}

export function pauseMockScheduledPayment(id: string): SheduledPayment | undefined {
  const payment = MOCK_SCHEDULED_PAYMENTS.find((item) => item.id === id);

  if (payment) {
    payment.status = 'PAUSED' as ReminderPaymentStatus;
  }

  return payment;
}

export function resumeMockScheduledPayment(id: string): SheduledPayment | undefined {
  const payment = MOCK_SCHEDULED_PAYMENTS.find((item) => item.id === id);

  if (payment) {
    payment.status = 'ACTIVE' as ReminderPaymentStatus;
  }

  return payment;
}

export function updateMockScheduledPayment(
  id: string,
  request: UpdateScheduledPaymentRequest,
): SheduledPayment | undefined {
  const payment = MOCK_SCHEDULED_PAYMENTS.find((item) => item.id === id);

  if (!payment) {
    return undefined;
  }

  return Object.assign(payment, {
    title: request.title ?? payment.title,
    description: request.description ?? payment.description,
    amount: request.amount ?? payment.amount,
    categoryName: request.categoryName ?? payment.categoryName,
    billingCycle: request.billingCycle ?? payment.billingCycle,
    billingInterval: request.billingInterval ?? payment.billingInterval,
    endDate: request.endDate ?? payment.endDate,
    nextBillingDate: request.nextBillingDate ?? payment.nextBillingDate,
  });
}

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
    nextBillingDate: '2026-05-07T00:00:00.000Z',
    endDate: '2027-05-26T00:00:00.000Z',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/500px-Netflix_icon.svg.png?_=20220806170125',
    status: 'ACTIVE' as ReminderPaymentStatus,
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
    nextBillingDate: '2026-05-07T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'ACTIVE' as ReminderPaymentStatus,
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
    nextBillingDate: '2026-05-07T00:00:00.000Z',
    endDate: '2026-12-31T00:00:00.000Z',
    logoUrl: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg',
    status: 'ACTIVE' as ReminderPaymentStatus,
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
    status: 'ACTIVE' as ReminderPaymentStatus,
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
    status: 'ACTIVE' as ReminderPaymentStatus,
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
    status: 'ACTIVE' as ReminderPaymentStatus,
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
    status: 'ACTIVE' as ReminderPaymentStatus,
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
    status: 'ACTIVE' as ReminderPaymentStatus,
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
    billingInterval: request.billingInterval ?? null,
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
