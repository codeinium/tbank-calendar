import { ApiCreateScheduledPaymentRequest, ApiCreateSubscriptionRequest, ApiScheduledPayments, ApiStatisticSubscriptions, ApiSubsription } from './reminder-payment.api';
import { CreateScheduledPaymentRequest, SheduledPayment } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { CreateSubscriptionRequest, StatisticSubscriptions, Subscription } from '@/app/models/subscription/subscription.model';
import { mapCreateScheduledPaymentRequest, mapCreateSubscriptionRequest, mapScheduledPayments, mapStatisticsSubscriptions, mapSubscription } from './reminder-payment.mapper';
import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of } from 'rxjs';
import { MOCK_SUBSCRIPTIONS, MOCK_SCHEDULED_PAYMENTS, createMockSubscription, createMockScheduledPayment, MOCK_UPCOMING_SUBSCRIPTIONS } from './reminder-payment.mock';
import { StatisticsPeriod } from '@/app/shared/types/statistics-period.type';

@Injectable({ providedIn: 'root' })
export class ReminderPaymentService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;

  constructor(private http: HttpClient) {}

  getSubsriptions(): Observable<Subscription[]> {
    if (this.useMock) {
      return of(MOCK_SUBSCRIPTIONS).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiSubsription[]>(`${this.apiUrl}/subscriptions`)
      .pipe(map((data) => data.map(mapSubscription)));
  }

  getShedulePayments(): Observable<SheduledPayment[]> {
    if (this.useMock) {
      return of(MOCK_SCHEDULED_PAYMENTS).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiScheduledPayments[]>(`${this.apiUrl}/payments`)
      .pipe(map((data) => data.map(mapScheduledPayments)));
  }

  createSubscription(request: CreateSubscriptionRequest): Observable<Subscription> {
    const apiRequest: ApiCreateSubscriptionRequest = mapCreateSubscriptionRequest(request);

    if (this.useMock) {
      const created = createMockSubscription(request);
      return of(created).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiSubsription>(`${this.apiUrl}/subscriptions`, apiRequest)
      .pipe(map(mapSubscription));
  }

  createScheduledPayment(request: CreateScheduledPaymentRequest): Observable<SheduledPayment> {
    const apiRequest: ApiCreateScheduledPaymentRequest = mapCreateScheduledPaymentRequest(request);

    if (this.useMock) {
      const created = createMockScheduledPayment(request);
      return of(created).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiScheduledPayments>(`${this.apiUrl}/payments`, apiRequest)
      .pipe(map(mapScheduledPayments));
  }

  getStatisticSubscriptions(dateFrom: string, dateTo: string): Observable<StatisticSubscriptions> {
    if (this.useMock) {
      return of(MOCK_UPCOMING_SUBSCRIPTIONS).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiStatisticSubscriptions>(`${this.apiUrl}/subscriptions`, {
        params: {
          dateFrom,
          dateTo,
        },
      })
      .pipe(map(mapStatisticsSubscriptions));
  }
}
