import { ApiScheduledPayments, ApiSubscription } from '../reminder-payment/reminder-payment.api';

export type ApiPlannedCalendarItemType = 'subscription' | 'scheduled_payment';

export interface ApiPlannedCalendarSubscriptionItem {
  type: 'subscription';
  planned_date: string;
  item: ApiSubscription;
}

export interface ApiPlannedCalendarScheduledPaymentItem {
  type: 'scheduled_payment';
  planned_date: string;
  item: ApiScheduledPayments;
}

export type ApiPlannedCalendarPayment =
  | ApiPlannedCalendarSubscriptionItem
  | ApiPlannedCalendarScheduledPaymentItem;

export interface ApiPlannedCalendarPaymentsResponse {
  items: ApiPlannedCalendarPayment[];
}
