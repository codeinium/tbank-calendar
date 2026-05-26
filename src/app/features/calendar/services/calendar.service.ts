import { Injectable, inject } from '@angular/core';
import { TransactionService } from '@/app/services/transaction/transaction.service';
import { PlannedCalendarPaymentService } from '@/app/services/planned-calendar-item/planned-calendar-item.service';
import { CalendarPageStore } from '../store/calendar-page.store';
import { Dayjs } from 'dayjs';

@Injectable()
export class CalendarPageService {
  private readonly transactionService = inject(TransactionService);
  private readonly store = inject(CalendarPageStore);
  private readonly plannedCalendarPaymentService = inject(PlannedCalendarPaymentService);

  loadTransactions() {
    const key = this.store.getRangeKey();

    const current = this.store.currentTransactionCache();
    const previous = this.store.previousTransactionCache();

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

  loadPlannedPayments() {
    const key = this.store.getRangeKey();

    const current = this.store.currentPlannedPaymentsCache();
    const previous = this.store.previousPlannedPaymentsCache();

    if (current?.key === key) {
      this.store.setPlannedPayments(current.data);
      this.store.error.set(null);
      return;
    }

    if (previous?.key === key) {
      this.store.restorePreviousPlannedPaymentsCache();
      this.store.error.set(null);
      return;
    }

    const { from, to } = this.store.range();

    this.plannedCalendarPaymentService.getPlannedPayments(from, to).subscribe({
      next: (plannedPayments) => {
        this.store.setPlannedPaymentsCache(key, plannedPayments);
      },
      error: () => {
        this.store.error.set('Не удалось загрузить плановые платежи');
      },
    });
  }

  loadCalendarData() {
    this.loadTransactions();
    this.loadPlannedPayments();
  }

  navigatePrev() {
    this.store.navigatePrev();
    this.loadCalendarData();
  }

  navigateNext() {
    this.store.navigateNext();
    this.loadCalendarData();
  }

  goToday() {
    this.store.goToday();
    this.loadCalendarData();
  }

  goToMonth(month: number) {
    this.store.goToMonth(month);
    this.loadCalendarData();
  }

  goToYear(year: number) {
    this.store.goToYear(year);
    this.loadCalendarData();
  }

  goToWeek(weekStart: Dayjs) {
    this.store.goToWeek(weekStart);
    this.loadCalendarData();
  }

  setView(view: 'month' | 'week') {
    this.store.setView(view);
    this.loadCalendarData();
  }
}
