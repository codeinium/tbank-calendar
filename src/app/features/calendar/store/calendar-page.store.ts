import { Injectable, computed, signal } from '@angular/core';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { Dayjs } from 'dayjs';
import { Transaction } from '@/app/models/transaction/transaction.model';
import {
  CalendarView,
  WeekDay,
  WEEK_DAY_TO_NUMBER,
  ChartView,
} from '@/app/features/calendar/models/types';

export interface ModalState {
  date: Dayjs | null;
  transactions: Transaction[];
}

type CalendarTransactionsCache = {
  key: string;
  data: Transaction[];
};

@Injectable()
export class CalendarPageStore {
  private readonly _view = signal<CalendarView>('month');
  private readonly _firstDayOfWeek = signal<WeekDay>('Понедельник');
  private readonly _dayMaxTransaction = signal(2);
  private readonly _showIncomes = signal(true);
  private readonly _showExpenses = signal(true);
  private readonly _chartView = signal<ChartView>('line');

  private readonly _currentDate = signal<Dayjs>(dayjs());
  private readonly _today = signal<Dayjs>(dayjs());

  private readonly _transactions = signal<Transaction[]>([]);
  private readonly _modalState = signal<ModalState>({
    date: null,
    transactions: [],
  });
  private readonly _currentCache = signal<CalendarTransactionsCache | null>(null);
  private readonly _previousCache = signal<CalendarTransactionsCache | null>(null);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly view = this._view.asReadonly();
  readonly firstDayOfWeek = this._firstDayOfWeek.asReadonly();
  readonly dayMaxTransaction = this._dayMaxTransaction.asReadonly();
  readonly showIncomes = this._showIncomes.asReadonly();
  readonly showExpenses = this._showExpenses.asReadonly();
  readonly chartView = this._chartView.asReadonly();
  readonly currentDate = this._currentDate.asReadonly();
  readonly today = this._today.asReadonly();
  readonly transactions = this._transactions.asReadonly();
  readonly modalState = this._modalState.asReadonly();
  readonly currentCache = this._currentCache.asReadonly();
  readonly previousCache = this._previousCache.asReadonly();

  readonly firstDayOfWeekNumber = computed(() => {
    return WEEK_DAY_TO_NUMBER[this._firstDayOfWeek()];
  });

  readonly range = computed(() => {
    const view = this._view();
    const date = this._currentDate();

    if (view === 'month') {
      return {
        from: dayjs(date).startOf('month').toISOString(),
        to: dayjs(date).endOf('month').toISOString(),
      };
    }

    return {
      from: dayjs(date).startOf('week').toISOString(),
      to: dayjs(date).endOf('week').toISOString(),
    };
  });

  getRangeKey() {
    const { from, to } = this.range();

    return `${from}_${to}`;
  }

  setTransactionsCache(key: string, transactions: Transaction[]) {
    const current = this._currentCache();

    if (current) {
      this._previousCache.set(current);
    }

    const cache = {
      key,
      data: transactions,
    };

    this._currentCache.set(cache);
    this._transactions.set(transactions);
  }

  restorePreviousCache() {
    const current = this._currentCache();
    const previous = this._previousCache();

    if (!previous) return;

    this._currentCache.set(previous);
    this._previousCache.set(current);
    this._transactions.set(previous.data);
  }

  readonly vm = computed(() => ({
    view: this._view(),
    currentDate: this._currentDate(),
    transactions: this._transactions(),
    loading: this.loading(),
    error: this.error(),
  }));

  setTransactions(transactions: Transaction[]) {
    this._transactions.set(transactions);
  }

  setView(view: CalendarView) {
    this._view.set(view);
  }

  setFirstDayOfWeek(day: WeekDay) {
    this._firstDayOfWeek.set(day);
  }

  setDayMaxTransaction(count: number) {
    this._dayMaxTransaction.set(count);
  }

  setShowIncomes(show: boolean) {
    this._showIncomes.set(show);
  }

  setShowExpenses(show: boolean) {
    this._showExpenses.set(show);
  }

  setChartView(chartView: ChartView) {
    this._chartView.set(chartView);
  }

  setCurrentDate(date: Dayjs | Date) {
    this._currentDate.set(dayjs.isDayjs(date) ? date : dayjs(date));
  }

  navigatePrev() {
    this._currentDate.update((prev) => {
      const view = this._view();

      if (view === 'month') return prev.subtract(1, 'month');
      if (view === 'week') return prev.subtract(1, 'week');

      return prev;
    });
  }

  navigateNext() {
    this._currentDate.update((prev) => {
      const view = this._view();

      if (view === 'month') return prev.add(1, 'month');
      if (view === 'week') return prev.add(1, 'week');

      return prev;
    });
  }

  goToday() {
    this._currentDate.set(this._today());
  }

  goToMonth(month: number) {
    this._currentDate.update((prev) => prev.month(month));
  }

  goToYear(year: number) {
    this._currentDate.update((prev) => prev.year(year));
  }

  goToWeek(weekStart: Dayjs) {
    this._currentDate.set(weekStart);
  }

  openDayModal(date: Dayjs, transactions: Transaction[]) {
    this._modalState.set({ date, transactions });
  }

  closeDayModal() {
    this._modalState.set({ date: null, transactions: [] });
  }
}
