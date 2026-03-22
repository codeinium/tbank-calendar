import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Transaction } from '../model/transaction.model';
import { ApiTransaction } from './transaction.api';
import { TRANSACTIONS_MOCK } from './transaction.mock';
import { mapTransaction } from './transaction.mapper';
import { CategoryService } from '../../category/api/category.service';

const USE_MOCK = true;

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
  ) {}

  getTransactions(): Observable<Transaction[]> {
    if (USE_MOCK) {
      return of(TRANSACTIONS_MOCK);
    }

    return combineLatest([
      this.http.get<ApiTransaction[]>('/'),
      this.categoryService.getCategories(),
    ]).pipe(
      map(([transactions, categories]) => transactions.map((t) => mapTransaction(t, categories))),
    );
  }
}
