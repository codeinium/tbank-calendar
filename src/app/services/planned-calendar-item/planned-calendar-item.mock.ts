import { MOCK_SCHEDULED_PAYMENTS } from './../reminder-payment/reminder-payment.mock';
import { MOCK_SUBSCRIPTIONS } from '../reminder-payment/reminder-payment.mock';

import { PlannedCalendarPayment } from '@/app/models/planned-calendar-item/planned-calendar-item.model';

export const PLANNED_CALENDAR_PAYMENTS_MOCK: PlannedCalendarPayment[] = [
  ...MOCK_SUBSCRIPTIONS.map((subscription) => ({
    type: 'subscription' as const,
    plannedDate: subscription.nextBillingDate,
    item: subscription,
  })),

  ...MOCK_SCHEDULED_PAYMENTS.map((payment) => ({
    type: 'scheduled_payment' as const,
    plannedDate: payment.nextBillingDate,
    item: payment,
  })),
];
