import { Injectable, signal, computed, effect } from '@angular/core';
import { Category } from '../../category/model/category.model';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../model/transaction.model';
import { TRANSACTIONS_MOCK } from './transaction.mock';
import { CategoryService } from '../../category/api/category.service';
import { mapTransaction } from './transaction.mapper';
import { ApiTransaction } from './transaction.api';

const useMock = true;

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly _cache = signal<Record<string, Transaction[]>>({});
  private readonly _loading = signal<Record<string, boolean>>({});
  private readonly _error = signal<Record<string, string | null>>({});

  readonly cache = this._cache.asReadonly();


  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
  ) {}

  private getKey(from: string, to: string) {
    return `${from}_${to}`;
  }

  private getCategoryMap(): Map<string, Category> {
    const categories = this.categoryService.categories();

    return new Map(categories.map((c) => [c.id, c]));
  }

  loadTransactions(from: string, to: string) {
    const key = this.getKey(from, to);

    if (this._cache()[key]) return;

    this._loading.update((l) => ({ ...l, [key]: true }));
    this._error.update((e) => ({ ...e, [key]: null }));

    if (useMock) {
      setTimeout(() => {
        const filtered = TRANSACTIONS_MOCK.filter((t) => {
          return t.date >= from && t.date <= to;
        });

        this._cache.update((c) => ({
          ...c,
          [key]: filtered,
        }));

        this._loading.update((l) => ({ ...l, [key]: false }));
      }, 1000);
      return;
    }


    this.http.get<ApiTransaction[]>('/api/v1/transactions', {
        params: { dateFrom: from, dateTo: to },
      })
      .subscribe({
        next: (data) => {
          const categoryMap = this.getCategoryMap();

          const mapped = data.map((t) => mapTransaction(t, categoryMap));

          this._cache.update((c) => ({
            ...c,
            [key]: mapped,
          }));

          this._loading.update((l) => ({ ...l, [key]: false }));
        },
        error: (err) => {
          this._error.update((e) => ({
            ...e,
            [key]: err.message,
          }));

          this._loading.update((l) => ({ ...l, [key]: false }));
        },
      });
  }

  isLoading(from: string, to: string) {
    return this._loading()[this.getKey(from, to)] ?? false;
  }

  getError(from: string, to: string) {
    return this._error()[this.getKey(from, to)] ?? null;
  }

  getTransactions(from: string, to: string) {
    const key = this.getKey(from, to);
    return this._cache()[key] ?? [];
  }
}