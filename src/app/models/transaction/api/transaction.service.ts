import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../model/transaction.model';
import { TRANSACTIONS_MOCK } from './transaction.mock';
import { mapTransaction } from './transaction.mapper';
import { ApiTransaction } from './transaction.api';
import { Observable, of, delay, map } from 'rxjs';

const useMock = true;
const MOCK_DELAY = 1000;

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly apiUrl = '/api/v1';

  constructor(private http: HttpClient) {}

  getTransactions(from: string, to: string): Observable<Transaction[]> {
    if (useMock) {
      const filtered = TRANSACTIONS_MOCK.filter((t) => {
        return t.date >= from && t.date <= to;
      });

      return of(filtered).pipe(delay(MOCK_DELAY));
    }

    return this.http
      .get<ApiTransaction[]>(`${this.apiUrl}/transactions`, {
        params: { dateFrom: from, dateTo: to },
      })
      .pipe(map((data) => data.map(mapTransaction)));
  }
}