import {
  ApiCreateScheduledPaymentRequest,
  ApiCreateSubscriptionRequest,
  ApiScheduledPayments,
  ApiStatisticSubscriptions,
  ApiSubscription,
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
import {
  mapCreateScheduledPaymentRequest,
  mapCreateSubscriptionRequest,
  mapScheduledPayments,
  mapStatisticsSubscriptions,
  mapSubscription,
} from './reminder-payment.mapper';
import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of } from 'rxjs';
import {
  MOCK_SUBSCRIPTIONS,
  MOCK_SCHEDULED_PAYMENTS,
  createMockSubscription,
  createMockScheduledPayment,
  MOCK_UPCOMING_SUBSCRIPTIONS,
  deleteMockSubscription,
  pauseMockSubscription,
  resumeMockSubscription,
  updateMockSubscription,
  deleteMockScheduledPayment,
  pauseMockScheduledPayment,
  resumeMockScheduledPayment,
  updateMockScheduledPayment,
} from './reminder-payment.mock';
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
      .get<ApiSubscription[]>(`${this.apiUrl}/subscriptions`)
      .pipe(map((data) => data.map(mapSubscription)));
  }

  getShedulePayments(): Observable<SheduledPayment[]> {
    if (this.useMock) {
      return of(MOCK_SCHEDULED_PAYMENTS).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiScheduledPayments[]>(`${this.apiUrl}/scheduled-payments`)
      .pipe(map((data) => data.map(mapScheduledPayments)));
  }

  createSubscription(request: CreateSubscriptionRequest): Observable<Subscription> {
    const apiRequest: ApiCreateSubscriptionRequest = mapCreateSubscriptionRequest(request);

    if (this.useMock) {
      const created = createMockSubscription(request);
      return of(created).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiSubscription>(`${this.apiUrl}/subscriptions`, apiRequest)
      .pipe(map(mapSubscription));
  }

  createScheduledPayment(request: CreateScheduledPaymentRequest): Observable<SheduledPayment> {
    const apiRequest: ApiCreateScheduledPaymentRequest = mapCreateScheduledPaymentRequest(request);

    if (this.useMock) {
      const created = createMockScheduledPayment(request);
      return of(created).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiScheduledPayments>(`${this.apiUrl}/scheduled-payments`, apiRequest)
      .pipe(map(mapScheduledPayments));
  }

  getStatisticSubscriptions(dateFrom: string, dateTo: string): Observable<StatisticSubscriptions> {
    if (this.useMock) {
      return of(MOCK_UPCOMING_SUBSCRIPTIONS).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiStatisticSubscriptions>(`${this.apiUrl}/subscriptions/stats`, {
        params: {
          dateFrom,
          dateTo,
        },
      })
      .pipe(map(mapStatisticsSubscriptions));
  }

  deleteSubscription(id: string): Observable<void> {
    if (this.useMock) {
      deleteMockSubscription(id);
      return of(void 0).pipe(delay(this.mockDelay));
    }

    return this.http.delete<void>(`${this.apiUrl}/subscriptions/${id}`);
  }

  pauseSubscription(id: string): Observable<Subscription | undefined> {
    if (this.useMock) {
      return of(pauseMockSubscription(id)).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiSubscription>(`${this.apiUrl}/subscriptions/${id}/pause`, {})
      .pipe(map(mapSubscription));
  }

  resumeSubscription(id: string): Observable<Subscription | undefined> {
    if (this.useMock) {
      return of(resumeMockSubscription(id)).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiSubscription>(`${this.apiUrl}/subscriptions/${id}/resume`, {})
      .pipe(map(mapSubscription));
  }

  updateSubscription(
    id: string,
    request: UpdateSubscriptionRequest,
  ): Observable<Subscription | undefined> {
    if (this.useMock) {
      return of(updateMockSubscription(id, request)).pipe(delay(this.mockDelay));
    }

    return this.http
      .patch<ApiSubscription>(`${this.apiUrl}/subscriptions/${id}`, request)
      .pipe(map(mapSubscription));
  }

  deleteScheduledPayment(id: string): Observable<void> {
    if (this.useMock) {
      deleteMockScheduledPayment(id);
      return of(void 0).pipe(delay(this.mockDelay));
    }

    return this.http.delete<void>(`${this.apiUrl}/scheduled-payments/${id}`);
  }

  pauseScheduledPayment(id: string): Observable<SheduledPayment | undefined> {
    if (this.useMock) {
      return of(pauseMockScheduledPayment(id)).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiScheduledPayments>(`${this.apiUrl}/scheduled-payments/${id}/pause`, {})
      .pipe(map(mapScheduledPayments));
  }

  resumeScheduledPayment(id: string): Observable<SheduledPayment | undefined> {
    if (this.useMock) {
      return of(resumeMockScheduledPayment(id)).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiScheduledPayments>(`${this.apiUrl}/scheduled-payments/${id}/resume`, {})
      .pipe(map(mapScheduledPayments));
  }

  updateScheduledPayment(
    id: string,
    request: UpdateScheduledPaymentRequest,
  ): Observable<SheduledPayment | undefined> {
    if (this.useMock) {
      return of(updateMockScheduledPayment(id, request)).pipe(delay(this.mockDelay));
    }

    return this.http
      .patch<ApiScheduledPayments>(`${this.apiUrl}/scheduled-payments/${id}`, request)
      .pipe(map(mapScheduledPayments));
  }
}
