import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { StatisticsService } from './statistics.service';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(StatisticsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch dashboard with date params and map fields', () => {
    const apiResponse = {
      summary: {
        current_balance: {
          amount: 50000,
          difference_from_previous_period: 5000,
          percent_change: 11.1,
          transaction_count: 10,
          category_count: 3,
        },
        income: {
          amount: 100000,
          difference_from_previous_period: 10000,
          percent_change: 11.1,
          transaction_count: 5,
          category_count: 2,
        },
        expenses: {
          amount: 50000,
          difference_from_previous_period: -5000,
          percent_change: -9.1,
          transaction_count: 20,
          category_count: 5,
        },
      },
      category_distribution: {
        expenses: {
          total_amount: 50000,
          items: [
            { category_id: 'cat-1', category_name: 'Продукты', amount: 20000, percentage: 40, color: '#FF6B6B' },
          ],
        },
        income: {
          total_amount: 100000,
          items: [
            { category_id: 'cat-2', category_name: 'Зарплата', amount: 100000, percentage: 100, color: '#4CAF50' },
          ],
        },
      },
      balance_history: {
        granularity: 'day' as const,
        current_period: [{ date: '2026-05-01', amount: 50000 }],
        previous_period: [{ date: '2026-04-01', amount: 45000 }],
      },
      impulse_index: {
        percent: 15,
        amount: 3000,
        time_from: '2026-05-01',
        time_to: '2026-05-31',
      },
      spending_speed: {
        is_reached: false,
        half_salary_reached_date: null,
        spent_percent: 45,
        comparison: [{ period: '2026-04', day: 20 }],
      },
    };

    service.getDashboard('2026-05-01', '2026-05-31').subscribe((dashboard) => {
      expect(dashboard.summary.currentBalance.amount).toBe(50000);
      expect(dashboard.summary.income.amount).toBe(100000);
      expect(dashboard.summary.expenses.amount).toBe(50000);
      expect(dashboard.categoryDistribution.expenses.items[0].categoryName).toBe('Продукты');
      expect(dashboard.categoryDistribution.income.items[0].categoryName).toBe('Зарплата');
      expect(dashboard.balanceHistory.granularity).toBe('day');
      expect(dashboard.impulseIndex.percent).toBe(15);
      expect(dashboard.spendingSpeed.spentPercent).toBe(45);
    });

    const req = httpMock.expectOne((r) => r.url.includes('/statistics/dashboard'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('dateFrom')).toBe('2026-05-01');
    expect(req.request.params.get('dateTo')).toBe('2026-05-31');

    req.flush(apiResponse);
  });
});
