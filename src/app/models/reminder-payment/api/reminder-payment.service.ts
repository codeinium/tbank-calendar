import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Subscription, CreateSubscriptionRequest } from '../model/subscription.model';
import { ScheduledPayment, CreateScheduledPaymentRequest } from '../model/scheduled-payment.model';
import { ApiSubscription, ApiCreateSubscriptionRequest } from './subscription.api';
import { ApiScheduledPayment, ApiCreateScheduledPaymentRequest } from './scheduled-payment.api';
import { mapSubscription, mapScheduledPayment } from './reminder-payment.mapper';

const USE_MOCK = true;

@Injectable({ providedIn: 'root' })
export class ReminderPaymentService {
  private readonly apiUrl = '/api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Получить все подписки
   * GET /api/v1/subscriptions
   */
  getSubscriptions(): Observable<Subscription[]> {
    if (USE_MOCK) {
      return of(this.getMockSubscriptions());
    }

    return this.http
      .get<ApiSubscription[]>(`${this.apiUrl}/subscriptions`)
      .pipe(map((data) => data.map(mapSubscription)));
  }

  /**
   * Получить все запланированные платежи
   * GET /api/v1/payments
   */
  getScheduledPayments(): Observable<ScheduledPayment[]> {
    if (USE_MOCK) {
      return of(this.getMockScheduledPayments());
    }

    return this.http
      .get<ApiScheduledPayment[]>(`${this.apiUrl}/payments`)
      .pipe(map((data) => data.map(mapScheduledPayment)));
  }

  /**
   * Создать подписку
   * POST /api/v1/subscriptions
   */
  createSubscription(request: CreateSubscriptionRequest): Observable<Subscription> {
    const apiRequest: ApiCreateSubscriptionRequest = {
      name: request.name,
      description: request.description,
      amount: request.amount,
      category_name: request.category_name,
      billing_cycle: request.billing_cycle,
      billing_interval: request.billing_interval,
      end_date: request.end_date,
      logo_url: request.logo_url,
    };

    if (USE_MOCK) {
      return of(this.createMockSubscription(apiRequest));
    }

    return this.http
      .post<ApiSubscription>(`${this.apiUrl}/subscriptions`, apiRequest)
      .pipe(map(mapSubscription));
  }

  /**
   * Создать запланированный платеж
   * POST /api/v1/scheduled-payments
   */
  createScheduledPayment(request: CreateScheduledPaymentRequest): Observable<ScheduledPayment> {
    const apiRequest: ApiCreateScheduledPaymentRequest = {
      title: request.title,
      description: request.description,
      amount: request.amount,
      category_name: request.category_name,
      frequency: request.frequency,
      interval: request.interval,
      end_date: request.end_date,
      logo_url: request.logo_url,
    };

    if (USE_MOCK) {
      return of(this.createMockScheduledPayment(apiRequest));
    }

    return this.http
      .post<ApiScheduledPayment>(`${this.apiUrl}/scheduled-payments`, apiRequest)
      .pipe(map(mapScheduledPayment));
  }

  // ========== Mock данные ==========

  private getMockSubscriptions(): Subscription[] {
    return [
      {
        id: 'sub-1',
        name: 'Netflix',
        description: 'Стриминговый сервис',
        amount: 799,
        category_name: 'Развлечения',
        category_color: '#FF6B6B',
        billing_cycle: 'monthly',
        billing_interval: 1,
        next_billing_date: '2026-04-15T00:00:00Z',
        end_date: null,
        logo_url: 'https://example.com/netflix.png',
        status: 'active',
      },
      {
        id: 'sub-2',
        name: 'Spotify',
        description: 'Музыкальный сервис',
        amount: 169,
        category_name: 'Развлечения',
        category_color: '#FF6B6B',
        billing_cycle: 'monthly',
        billing_interval: 1,
        next_billing_date: '2026-04-20T00:00:00Z',
        end_date: null,
        logo_url: 'https://example.com/spotify.png',
        status: 'active',
      },
    ];
  }

  private getMockScheduledPayments(): ScheduledPayment[] {
    return [
      {
        id: 'pay-1',
        title: 'Аренда квартиры',
        description: 'Ежемесячная оплата',
        amount: 45000,
        category_name: 'Жильё',
        category_color: '#4ECDC4',
        frequency: 'monthly',
        interval: 1,
        next_payment_at: '2026-05-01T00:00:00Z',
        end_date: null,
        logo_url: null,
        status: 'active',
      },
      {
        id: 'pay-2',
        title: 'Интернет',
        description: 'Домашний интернет',
        amount: 550,
        category_name: 'Связь',
        category_color: '#95E1D3',
        frequency: 'monthly',
        interval: 1,
        next_payment_at: '2026-04-10T00:00:00Z',
        end_date: null,
        logo_url: 'https://example.com/isp.png',
        status: 'active',
      },
    ];
  }

  private createMockSubscription(request: ApiCreateSubscriptionRequest): Subscription {
    return {
      id: `sub-${Date.now()}`,
      name: request.name,
      description: request.description,
      amount: request.amount,
      category_name: request.category_name,
      category_color: '#CCCCCC',
      billing_cycle: request.billing_cycle,
      billing_interval: request.billing_interval ?? 1,
      next_billing_date: new Date().toISOString(),
      end_date: request.end_date ?? null,
      logo_url: request.logo_url ?? null,
      status: 'active',
    };
  }

  private createMockScheduledPayment(request: ApiCreateScheduledPaymentRequest): ScheduledPayment {
    return {
      id: `pay-${Date.now()}`,
      title: request.title,
      description: request.description,
      amount: request.amount,
      category_name: request.category_name,
      category_color: '#CCCCCC',
      frequency: request.frequency,
      interval: request.interval ?? 1,
      next_payment_at: new Date().toISOString(),
      end_date: request.end_date ?? null,
      logo_url: request.logo_url ?? null,
      status: 'active',
    };
  }
}
