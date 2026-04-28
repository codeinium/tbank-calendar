import { ApiSheduledPayments, ApiSubsription } from './reminder-payment.api';
import { SheduledPayment } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { Subscription } from '@/app/models/subscription/subscription.model';
import { mapSheduledPayments, mapSubscription } from './reminder-payment.mapper';
import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of } from 'rxjs';
import { MOCK_SUBSCRIPTIONS, MOCK_SCHEDULED_PAYMENTS } from './reminder-payment.mock';

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
      .get<ApiSheduledPayments[]>(`${this.apiUrl}/payments`)
      .pipe(map((data) => data.map(mapSheduledPayments)));
  }
}
