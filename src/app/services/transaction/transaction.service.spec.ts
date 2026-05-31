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
import { TransactionService } from './transaction.service';
import { Transaction } from '@/app/models/transaction/transaction.model';

environment.useMock = false;
environment.mockDelay = 0;

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch transactions with date params', () => {
    const apiResponse = [
      {
        id: '1',
        counterparty: 'Пятёрочка',
        category_name: 'Продукты',
        amount: 500,
        type: 'expense' as const,
        transaction_date: '2026-04-04T14:31:00',
        description: 'Покупка продуктов',
        category_color: '#FF6B6B',
      },
    ];

    service.getTransactions('2026-04-01', '2026-04-30').subscribe((transactions: Transaction[]) => {
      expect(transactions.length).toBe(1);
      expect(transactions[0].counterpartyName).toBe('Пятёрочка');
      expect(transactions[0].categoryName).toBe('Продукты');
      expect(transactions[0].amount).toBe(500);
      expect(transactions[0].type).toBe('expense');
      expect(transactions[0].date).toBe('2026-04-04T14:31:00');
    });

    const req = httpMock.expectOne((r) => r.url.includes('/transactions'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('dateFrom')).toBe('2026-04-01');
    expect(req.request.params.get('dateTo')).toBe('2026-04-30');

    req.flush(apiResponse);
  });

  it('should return empty array when no transactions in range', () => {
    service.getTransactions('2099-01-01', '2099-12-31').subscribe((transactions) => {
      expect(transactions).toEqual([]);
    });

    const req = httpMock.expectOne((r) => r.url.includes('/transactions'));
    req.flush([]);
  });

  it('should map API fields correctly', () => {
    const apiResponse = [
      {
        id: '42',
        counterparty: 'Работодатель',
        category_name: 'Зарплата',
        amount: 100000,
        type: 'income' as const,
        transaction_date: '2026-05-01T09:00:00',
        description: 'Зарплата за май',
        category_color: '#4CAF50',
      },
    ];

    service.getTransactions('2026-05-01', '2026-05-31').subscribe((transactions) => {
      expect(transactions[0]).toEqual({
        id: '42',
        counterpartyName: 'Работодатель',
        categoryName: 'Зарплата',
        amount: 100000,
        type: 'income',
        date: '2026-05-01T09:00:00',
        description: 'Зарплата за май',
        categoryColor: '#4CAF50',
      });
    });

    const req = httpMock.expectOne((r) => r.url.includes('/transactions'));
    req.flush(apiResponse);
  });
});
