import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '@/environments/environment';
import { ReminderPaymentService } from './reminder-payment.service';

environment.useMock = false;
environment.mockDelay = 0;

describe('ReminderPaymentService', () => {
  let service: ReminderPaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ReminderPaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch subscriptions', () => {
    service.getSubsriptions().subscribe((subs) => {
      expect(subs.length).toBe(1);
      expect(subs[0].title).toBe('Netflix');
    });

    const req = httpMock.expectOne('/api/v1/subscriptions');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 'sub-1', name: 'Netflix', description: null, amount: 999,
        category_name: 'Развлечения', category_color: '#FF6B6B',
        billing_cycle: 'monthly', billing_interval: 1,
        next_billing_date: '2026-06-15', end_date: null, logo_url: null,
        status: 'active',
      },
    ]);
  });

  it('should fetch scheduled payments', () => {
    service.getShedulePayments().subscribe((payments) => {
      expect(payments.length).toBe(1);
      expect(payments[0].title).toBe('Аренда');
    });

    const req = httpMock.expectOne('/api/v1/scheduled-payments');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 'pay-1', title: 'Аренда', description: null, amount: 30000,
        category_name: 'Жильё', category_color: '#795548',
        billing_cycle: 'monthly', billing_interval: 1,
        next_billing_date: '2026-06-01', end_date: null,
        status: 'active',
      },
    ]);
  });

  it('should create a subscription', () => {
    const request = {
      title: 'Новая подписка',
      description: null,
      amount: 500,
      categoryName: 'Развлечения',
      billingCycle: 'monthly' as const,
      billingInterval: 1,
      endDate: null,
      nextBillingDate: '2026-07-01',
    };

    service.createSubscription(request).subscribe((sub) => {
      expect(sub.title).toBe('Новая подписка');
    });

    const req = httpMock.expectOne('/api/v1/subscriptions');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'Новая подписка', description: null, amount: 500,
      category_name: 'Развлечения', billing_cycle: 'monthly',
      billing_interval: 1, end_date: null, next_billing_date: '2026-07-01',
    });
    req.flush({
      id: 'sub-new', name: 'Новая подписка', description: null, amount: 500,
      category_name: 'Развлечения', category_color: '#FF6B6B',
      billing_cycle: 'monthly', billing_interval: 1,
      next_billing_date: '2026-07-01', end_date: null, logo_url: null,
      status: 'active',
    });
  });

  it('should create a scheduled payment', () => {
    const request = {
      title: 'Разовый платёж',
      description: null,
      amount: 10000,
      categoryName: 'Услуги',
      billingCycle: null,
      billingInterval: 0,
      endDate: null,
      nextBillingDate: '2026-06-15',
    };

    service.createScheduledPayment(request).subscribe((pay) => {
      expect(pay.title).toBe('Разовый платёж');
    });

    const req = httpMock.expectOne('/api/v1/scheduled-payments');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      title: 'Разовый платёж', description: null, amount: 10000,
      category_name: 'Услуги', billing_cycle: null, billing_interval: 0,
      end_date: null, next_billing_date: '2026-06-15',
    });
    req.flush({
      id: 'pay-new', title: 'Разовый платёж', description: null, amount: 10000,
      category_name: 'Услуги', category_color: '#2196F3',
      billing_cycle: null, billing_interval: 0,
      next_billing_date: '2026-06-15', end_date: null,
      status: 'pending',
    });
  });

  it('should fetch subscription stats', () => {
    service.getStatisticSubscriptions('2026-05-01', '2026-05-31').subscribe((stats) => {
      expect(stats.totalAmount).toBe(2000);
    });

    const req = httpMock.expectOne((r) => r.url.includes('/subscriptions/stats'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('dateFrom')).toBe('2026-05-01');
    expect(req.request.params.get('dateTo')).toBe('2026-05-31');
    req.flush({
      total_amount: 2000, average_cost: 1000,
      items: [
        { id: 'sub-1', name: 'Netflix', next_payment_date: '2026-05-15', amount: 999 },
        { id: 'sub-2', name: 'Spotify', next_payment_date: '2026-05-20', amount: 1001 },
      ],
    });
  });

  it('should delete a subscription', () => {
    service.deleteSubscription('sub-1').subscribe();

    const req = httpMock.expectOne('/api/v1/subscriptions/sub-1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should pause a subscription', () => {
    service.pauseSubscription('sub-1').subscribe();

    const req = httpMock.expectOne('/api/v1/subscriptions/sub-1/pause');
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 'sub-1', name: 'Netflix', description: null, amount: 999,
      category_name: 'Развлечения', category_color: '#FF6B6B',
      billing_cycle: 'monthly', billing_interval: 1,
      next_billing_date: '2026-06-15', end_date: null, logo_url: null,
      status: 'paused',
    });
  });

  it('should resume a subscription', () => {
    service.resumeSubscription('sub-1').subscribe();

    const req = httpMock.expectOne('/api/v1/subscriptions/sub-1/resume');
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 'sub-1', name: 'Netflix', description: null, amount: 999,
      category_name: 'Развлечения', category_color: '#FF6B6B',
      billing_cycle: 'monthly', billing_interval: 1,
      next_billing_date: '2026-06-15', end_date: null, logo_url: null,
      status: 'active',
    });
  });

  it('should update a subscription', () => {
    service.updateSubscription('sub-1', { title: 'Netflix Premium', amount: 1499 }).subscribe();

    const req = httpMock.expectOne('/api/v1/subscriptions/sub-1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ name: 'Netflix Premium', amount: 1499 });
    req.flush({
      id: 'sub-1', name: 'Netflix Premium', description: null, amount: 1499,
      category_name: 'Развлечения', category_color: '#FF6B6B',
      billing_cycle: 'monthly', billing_interval: 1,
      next_billing_date: '2026-06-15', end_date: null, logo_url: null,
      status: 'active',
    });
  });

  it('should delete a scheduled payment', () => {
    service.deleteScheduledPayment('pay-1').subscribe();

    const req = httpMock.expectOne('/api/v1/scheduled-payments/pay-1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should pause a scheduled payment', () => {
    service.pauseScheduledPayment('pay-1').subscribe();

    const req = httpMock.expectOne('/api/v1/scheduled-payments/pay-1/pause');
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 'pay-1', title: 'Аренда', description: null, amount: 30000,
      category_name: 'Жильё', category_color: '#795548',
      frequency: 'monthly', interval: 1,
      next_payment_at: '2026-06-01', end_date: null,
      status: 'paused',
    });
  });

  it('should resume a scheduled payment', () => {
    service.resumeScheduledPayment('pay-1').subscribe();

    const req = httpMock.expectOne('/api/v1/scheduled-payments/pay-1/resume');
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 'pay-1', title: 'Аренда', description: null, amount: 30000,
      category_name: 'Жильё', category_color: '#795548',
      frequency: 'monthly', interval: 1,
      next_payment_at: '2026-06-01', end_date: null,
      status: 'active',
    });
  });

  it('should update a scheduled payment', () => {
    service
      .updateScheduledPayment('pay-1', { title: 'Новая аренда', amount: 35000 })
      .subscribe();

    const req = httpMock.expectOne('/api/v1/scheduled-payments/pay-1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ title: 'Новая аренда', amount: 35000 });
    req.flush({
      id: 'pay-1', title: 'Новая аренда', description: null, amount: 35000,
      category_name: 'Жильё', category_color: '#795548',
      frequency: 'monthly', interval: 1,
      next_payment_at: '2026-07-01', end_date: null,
      status: 'active',
    });
  });
});
