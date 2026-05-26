import { Subscription } from '../subscription/subscription.model';
import { SheduledPayment } from '../scheduled-payment/scheduled-payment.model';

export type PlannedCalendarItemType = 'subscription' | 'scheduled_payment';

export interface PlannedCalendarItem<T> {
  type: PlannedCalendarItemType;
  plannedDate: string;
  item: T;
}

export type PlannedCalendarPayment =
  | PlannedCalendarItem<Subscription>
  | PlannedCalendarItem<SheduledPayment>;

export interface PlannedCalendarPaymentsResponse {
  items: PlannedCalendarPayment[];
}
