import {
  ApiCreateScheduledPaymentRequest,
  ApiCreateSubscriptionRequest,
  ApiScheduledPayments,
  ApiStatisticSubscriptions,
  ApiSubscription,
  ApiUpdateScheduledPaymentRequest,
  ApiUpdateSubscriptionRequest,
} from './reminder-payment.api';
import {
  CreateScheduledPaymentRequest,
  SheduledPayment,
  UpdateScheduledPaymentRequest,
} from '@/app/models/scheduled-payment/scheduled-payment.model';
import {
  CreateSubscriptionRequest,
  StatisticSubscriptions,
  Subscription,
  UpdateSubscriptionRequest,
} from '@/app/models/subscription/subscription.model';

export function mapSubscription(api: ApiSubscription): Subscription {
  return {
    id: api.id,
    title: api.name,
    description: api.description,
    amount: api.amount,
    categoryName: api.category_name,
    categoryColor: api.category_color,
    billingCycle: api.billing_cycle,
    billingInterval: api.billing_interval,
    nextBillingDate: api.next_billing_date,
    endDate: api.end_date,
    logoUrl: api.logo_url,
    status: api.status,
  };
}

export function mapScheduledPayments(api: ApiScheduledPayments): SheduledPayment {
  return {
    id: api.id,
    title: api.title,
    description: api.description,
    amount: api.amount,
    categoryName: api.category_name,
    categoryColor: api.category_color,
    billingCycle: api.frequency,
    billingInterval: api.interval,
    nextBillingDate: api.next_payment_at,
    endDate: api.end_date,
    status: api.status,
  };
}

export function mapCreateSubscriptionRequest(
  request: CreateSubscriptionRequest,
): ApiCreateSubscriptionRequest {
  return {
    name: request.title,
    description: request.description,
    amount: request.amount,
    category_name: request.categoryName,
    billing_cycle: request.billingCycle,
    billing_interval: request.billingInterval,
    end_date: request.endDate,
    next_billing_date: request.nextBillingDate,
  };
}
export function mapCreateScheduledPaymentRequest(
  request: CreateScheduledPaymentRequest,
): ApiCreateScheduledPaymentRequest {
  return {
    title: request.title,
    description: request.description,
    amount: request.amount,
    category_name: request.categoryName,
    frequency: request.billingCycle,
    interval: request.billingInterval,
    end_date: request.endDate,
    next_payment_at: request.nextBillingDate,
  };
}

export function mapUpdateSubscriptionRequest(
  request: UpdateSubscriptionRequest,
): ApiUpdateSubscriptionRequest {
  return {
    name: request.title,
    description: request.description,
    amount: request.amount,
    category_name: request.categoryName,
    billing_cycle: request.billingCycle,
    billing_interval: request.billingInterval,
    end_date: request.endDate,
    next_billing_date: request.nextBillingDate,
    logo_url: request.logoUrl,
  };
}

export function mapUpdateScheduledPaymentRequest(
  request: UpdateScheduledPaymentRequest,
): ApiUpdateScheduledPaymentRequest {
  return {
    title: request.title,
    description: request.description,
    amount: request.amount,
    category_name: request.categoryName,
    frequency: request.billingCycle,
    interval: request.billingInterval,
    end_date: request.endDate,
    next_payment_at: request.nextBillingDate,
  };
}

export function mapStatisticsSubscriptions(api: ApiStatisticSubscriptions): StatisticSubscriptions {
  return {
    totalAmount: api.total_amount,
    averageAmount: api.average_cost,

    items: api.items.map((item) => ({
      id: item.id,
      name: item.name,
      nextPaymentDate: item.next_payment_date,
      amount: item.amount,
      iconUrl: item.icon_url,
    })),
  };
}
