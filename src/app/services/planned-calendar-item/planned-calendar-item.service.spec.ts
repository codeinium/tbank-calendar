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
import { PlannedCalendarPaymentService } from './planned-calendar-item.service';

environment.useMock = false;
environment.mockDelay = 0;

describe('PlannedCalendarPaymentService', () => {
  let service: PlannedCalendarPaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(PlannedCalendarPaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch planned payments with date params', () => {
    const apiResponse = {
      items: [
        {
          type: 'subscription',
          planned_date: '2026-05-15',
          item: {
            id: 'sub-1',
            name: 'Netflix',
            amount: 999,
            payment_date: 15,
            status: 'active',
            billing_cycle: 'monthly',
            billing_interval: 1,
            created_at: '2026-01-01T00:00:00',
          },
        },
        {
          type: 'scheduled_payment',
          planned_date: '2026-05-20',
          item: {
            id: 'pay-1',
            name: 'Аренда',
            amount: 30000,
            scheduled_date: '2026-05-20',
            status: 'pending',
            created_at: '2026-04-01T00:00:00',
          },
        },
      ],
    };

    service.getPlannedPayments('2026-05-01', '2026-05-31').subscribe((payments) => {
      expect(payments.length).toBe(2);
      expect(payments[0].type).toBe('subscription');
      expect(payments[0].plannedDate).toBe('2026-05-15');
      expect(payments[1].type).toBe('scheduled_payment');
      expect(payments[1].plannedDate).toBe('2026-05-20');
    });

    const req = httpMock.expectOne((r) => r.url.includes('/payments/timeline'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('dateFrom')).toBe('2026-05-01');
    expect(req.request.params.get('dateTo')).toBe('2026-05-31');

    req.flush(apiResponse);
  });
});
