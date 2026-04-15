import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../model/transaction.model';
import { TRANSACTIONS_MOCK } from './transaction.mock';
import { mapTransaction } from './transaction.mapper';
import { ApiTransaction } from './transaction.api';
import { Observable, of, delay, map } from 'rxjs';
import { environment } from '@/environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;

  constructor(private http: HttpClient) {}

  getTransactions(from: string, to: string): Observable<Transaction[]> {
    if (this.useMock) {
      const filtered = TRANSACTIONS_MOCK.filter((t) => {
        return t.date >= from && t.date <= to;
      });

      return of(filtered).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiTransaction[]>(`${this.apiUrl}/transactions`, {
        params: { dateFrom: from, dateTo: to },
      })
      .pipe(map((data) => data.map(mapTransaction)));
  }
}