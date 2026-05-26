import { Injectable, inject } from '@angular/core';
import { TransactionService } from '@/app/services/transaction/transaction.service';
import { CalendarPageStore } from '../store/calendar-page.store';
import { Dayjs } from 'dayjs';


@Injectable()
export class CalendarPageService {
  private readonly transactionService = inject(TransactionService);
  private readonly store = inject(CalendarPageStore);

  loadTransactions() {
    const key = this.store.getRangeKey();

    const current = this.store.currentCache();
    const previous = this.store.previousCache();

    if (current?.key === key) {
      this.store.setTransactions(current.data);
      this.store.loading.set(false);
      this.store.error.set(null);
      return;
    }

    if (previous?.key === key) {
      this.store.restorePreviousCache();
      this.store.loading.set(false);
      this.store.error.set(null);
      return;
    }

    const { from, to } = this.store.range();

    this.store.loading.set(true);
    this.store.error.set(null);

    this.transactionService.getTransactions(from, to).subscribe({
      next: (transactions) => {
        this.store.setTransactionsCache(key, transactions);
        this.store.loading.set(false);
      },
      error: () => {
        this.store.error.set('Не удалось загрузить транзакции');
        this.store.loading.set(false);
      },
    });
  }

  navigatePrev() {
    this.store.navigatePrev();
    this.loadTransactions();
  }

  navigateNext() {
    this.store.navigateNext();
    this.loadTransactions();
  }

  goToday() {
    this.store.goToday();
    this.loadTransactions();
  }

  goToMonth(month: number) {
    this.store.goToMonth(month);
    this.loadTransactions();
  }

  goToYear(year: number) {
    this.store.goToYear(year);
    this.loadTransactions();
  }

  goToWeek(weekStart: Dayjs) {
    this.store.goToWeek(weekStart);
    this.loadTransactions();
  }

  setView(view: 'month' | 'week') {
    this.store.setView(view);
    this.loadTransactions();
  }
}
