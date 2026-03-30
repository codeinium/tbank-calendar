import { Injectable, signal, computed, Signal } from '@angular/core';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { Dayjs } from 'dayjs';
import { Transaction } from '@/app/models/transaction/model/transaction.model';
import { CalendarView, WeekDay, WEEK_DAY_TO_NUMBER, ChartView } from '@/app/models/calendar/types';

export interface ModalState {
  date: Dayjs | null;
  transactions: Transaction[];
}

export interface CalendarState {
  view: CalendarView;
  firstDayOfWeek: WeekDay;
  firstDayOfWeekNumber: number;
  dayMaxTransaction: number;
  showIncomes: boolean;
  showExpenses: boolean;
  currentDate: Dayjs;
  today: Dayjs;
}

@Injectable({ providedIn: 'root' })
export class CalendarService {
  // настройки — сигналы
  private readonly _view = signal<CalendarView>('month');
  private readonly _firstDayOfWeek = signal<WeekDay>('Понедельник');
  private readonly _dayMaxTransaction = signal(2);
  private readonly _showIncomes = signal(true);
  private readonly _showExpenses = signal(true);
  private readonly _chartView = signal<ChartView>('line');

  private readonly _currentDate = signal<Dayjs>(dayjs());
  private readonly _today = signal<Dayjs>(dayjs());

  // модальное окно
  private readonly _modalState = signal<ModalState>({ date: null, transactions: [] });

  // вычисляемые значения — computed
  readonly firstDayOfWeekNumber = computed(() => WEEK_DAY_TO_NUMBER[this._firstDayOfWeek()]);

  // публичные сигналы только для чтения
  readonly view: Signal<CalendarView> = this._view.asReadonly();
  readonly firstDayOfWeek: Signal<WeekDay> = this._firstDayOfWeek.asReadonly();
  readonly dayMaxTransaction: Signal<number> = this._dayMaxTransaction.asReadonly();
  readonly showIncomes: Signal<boolean> = this._showIncomes.asReadonly();
  readonly showExpenses: Signal<boolean> = this._showExpenses.asReadonly();
  readonly chartView: Signal<ChartView> = this._chartView.asReadonly();
  readonly currentDate: Signal<Dayjs> = this._currentDate.asReadonly();
  readonly today: Signal<Dayjs> = this._today.asReadonly();
  readonly modalState: Signal<ModalState> = this._modalState.asReadonly();

  constructor() {
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

  // навигация
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

  // модальное окно
  openDayModal(date: Dayjs, transactions: Transaction[]) {
    this._modalState.set({ date, transactions });
  }

  closeDayModal() {
    this._modalState.set({ date: null, transactions: [] });
  }

  initialize(options?: {
    initialView?: CalendarView;
    initialDate?: Date | Dayjs;
    firstDayOfWeek?: WeekDay;
  }) {
    if (options?.initialView) this._view.set(options.initialView);
    if (options?.firstDayOfWeek) this._firstDayOfWeek.set(options.firstDayOfWeek);
    if (options?.initialDate) {
      const date = dayjs.isDayjs(options.initialDate)
        ? options.initialDate
        : dayjs(options.initialDate);
      this._currentDate.set(date);
    }
  }
}
