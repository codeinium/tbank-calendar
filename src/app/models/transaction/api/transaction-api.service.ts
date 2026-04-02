import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Transaction, TransactionsQueryParams } from '../model/transaction.model';
import { ApiTransaction, ApiTransactionsQueryParams } from './transaction.api';
import { mapTransaction } from './transaction.mapper';

const USE_MOCK = true;

@Injectable({ providedIn: 'root' })
export class TransactionApiService {
  private readonly apiUrl = '/api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Получить транзакции за период
   * GET /api/v1/transactions?dateFrom=&dateTo=
   */
  getTransactions(params?: TransactionsQueryParams): Observable<Transaction[]> {
    if (USE_MOCK) {
      return of(this.getMockTransactions());
    }

    let httpParams = new HttpParams();

    if (params?.dateFrom) {
      httpParams = httpParams.set('dateFrom', params.dateFrom);
    }
    if (params?.dateTo) {
      httpParams = httpParams.set('dateTo', params.dateTo);
    }

    return this.http
      .get<ApiTransaction[]>(`${this.apiUrl}/transactions`, { params: httpParams })
      .pipe(map((data) => data.map(mapTransaction)));
  }

  // ========== Mock данные ==========

  private getMockTransactions(): Transaction[] {
    return [
      {
        id: 'txn-1',
        from_account_name: 'Основной счёт',
        to_account_name: '',
        counterparty_name: 'Пятерочка',
        category_name: 'Продукты',
        amount: 1250,
        type: 'expense',
        transaction_date: '2026-04-01T14:30:00Z',
        description: 'Покупка продуктов',
        category_color: '#FF6B6B',
      },
      {
        id: 'txn-2',
        from_account_name: '',
        to_account_name: 'Основной счёт',
        counterparty_name: 'Зарплата',
        category_name: 'Доход',
        amount: 150000,
        type: 'income',
        transaction_date: '2026-04-01T09:00:00Z',
        description: 'Зарплата за март',
        category_color: '#4ECDC4',
      },
      {
        id: 'txn-3',
        from_account_name: 'Основной счёт',
        to_account_name: 'Накопительный счёт',
        counterparty_name: '',
        category_name: 'Перевод',
        amount: 30000,
        type: 'expense',
        transaction_date: '2026-04-02T10:00:00Z',
        description: 'Перевод на накопительный счёт',
        category_color: '#95E1D3',
      },
      {
        id: 'txn-4',
        from_account_name: 'Основной счёт',
        to_account_name: '',
        counterparty_name: 'Яндекс.Такси',
        category_name: 'Транспорт',
        amount: 450,
        type: 'expense',
        transaction_date: '2026-04-02T18:45:00Z',
        description: 'Поездка до офиса',
        category_color: '#F38181',
      },
    ];
  }
}
