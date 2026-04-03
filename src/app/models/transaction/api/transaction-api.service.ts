import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TransactionDto } from './transaction.dto';

const USE_MOCK = true;

@Injectable({ providedIn: 'root' })
export class TransactionApiService {
  private readonly apiUrl = '/api/v1';

  private readonly _cache = signal<Record<string, TransactionDto[]>>({});
  private readonly _loading = signal<Record<string, boolean>>({});
  private readonly _error = signal<Record<string, string | null>>({});

  readonly cache = this._cache.asReadonly();

  constructor(private http: HttpClient) {}

  private getKey(dateFrom: string, dateTo: string): string {
    return `${dateFrom}_${dateTo}`;
  }

  /**
   * Загрузить транзакции за период
   * GET /api/v1/transactions?dateFrom=&dateTo=
   */
  loadTransactions(dateFrom: string, dateTo: string) {
    const key = this.getKey(dateFrom, dateTo);

    if (this._cache()[key]) return;

    this._loading.update((l) => ({ ...l, [key]: true }));
    this._error.update((e) => ({ ...e, [key]: null }));

    if (USE_MOCK) {
      setTimeout(() => {
        const filtered = this.getMockTransactions().filter((t) => {
          return t.transaction_date >= dateFrom && t.transaction_date <= dateTo;
        });

        this._cache.update((c) => ({ ...c, [key]: filtered }));
        this._loading.update((l) => ({ ...l, [key]: false }));
      }, 300);
      return;
    }

    this.http
      .get<TransactionDto[]>(`${this.apiUrl}/transactions`, {
        params: { dateFrom, dateTo },
      })
      .subscribe({
        next: (data) => {
          this._cache.update((c) => ({ ...c, [key]: data }));
          this._loading.update((l) => ({ ...l, [key]: false }));
        },
        error: (err) => {
          this._error.update((e) => ({ ...e, [key]: err.message }));
          this._loading.update((l) => ({ ...l, [key]: false }));
        },
      });
  }

  /**
   * Статус загрузки для диапазона
   */
  isLoading(dateFrom: string, dateTo: string): boolean {
    return this._loading()[this.getKey(dateFrom, dateTo)] ?? false;
  }

  /**
   * Ошибка для диапазона
   */
  getError(dateFrom: string, dateTo: string): string | null {
    return this._error()[this.getKey(dateFrom, dateTo)] ?? null;
  }

  /**
   * Получить транзакции из кэша для диапазона
   */
  getTransactions(dateFrom: string, dateTo: string): TransactionDto[] {
    const key = this.getKey(dateFrom, dateTo);
    return this._cache()[key] ?? [];
  }

  // ========== Mock данные ==========

  private getMockTransactions(): TransactionDto[] {
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
