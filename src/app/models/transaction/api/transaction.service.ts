import { Injectable, signal, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
// import { environment } from '@/environments/environment';
import { Transaction } from '../model/transaction.model';
import { TRANSACTIONS_MOCK } from './transaction.mock';
import { CategoryService } from '../../category/api/category.service';

const useMock = true;

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);


  private readonly _transactions = signal<Transaction[]>(
    useMock ? TRANSACTIONS_MOCK : [],
  );

  readonly transactions = this._transactions.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
  ) {
    this.loadTransactions();
  }

  loadTransactions() {
    this._loading.set(true);
    this._error.set(null);

    if (useMock) {
      setTimeout(() => {
        this._transactions.set(TRANSACTIONS_MOCK);
        this._loading.set(false);
      }, 300);
      return;
    }

    this.http.get<Transaction[]>('/api/transactions').subscribe({
      next: (data) => {
        this._transactions.set(data);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }
}
