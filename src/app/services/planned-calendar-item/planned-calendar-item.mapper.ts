import { ApiSubscription, ApiScheduledPayments } from './../reminder-payment/reminder-payment.api';
import { ApiPlannedCalendarPayment } from './planned-calendar-item.api';
import { PlannedCalendarPayment } from '@/app/models/planned-calendar-item/planned-calendar-item.model';

import { Subscription } from '@/app/models/subscription/subscription.model';
import { SheduledPayment } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { mapScheduledPayments, mapSubscription } from '../reminder-payment/reminder-payment.mapper';


export function mapPlannedCalendarPayment(api: ApiPlannedCalendarPayment): PlannedCalendarPayment {
  if (api.type === 'subscription') {
    return {
      type: 'subscription',
      plannedDate: api.planned_date,
      item: mapSubscription(api.item),
    };
  }

  return {
    type: 'scheduled_payment',
    plannedDate: api.planned_date,
    item: mapScheduledPayments(api.item),
  };
}
