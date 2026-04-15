import { Component, inject, input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from '@/app/features/calendar/services/calendar.service';
import { filterTransactionsByDay } from '@/app/shared/config/date/date';
import type { Transaction } from '@/app/models/transaction/model/transaction.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { weekDayLabels, weekDayLabelsShort } from '@/app/models/calendar/types';

export interface CalendarDay {
  date: dayjs.Dayjs;
  isCurrentMonth: boolean;
  transactions: Transaction[];
}

export interface CalendarViewData {
  rows: CalendarDay[][]; // недели для month, одна неделя для week
  dayLabels: string[];
  shortDayLabels: string[];
}

@Component({
  imports: [CommonModule],
  template: '', // пустой — переопределяется в наследниках
})
export abstract class BaseCalendarView {
  readonly transactions = input.required<Transaction[]>();

  protected calendar = inject(CalendarService);

  protected readonly currentDate = this.calendar.currentDate;
  protected readonly firstDayOfWeekNumber = this.calendar.firstDayOfWeekNumber;

  protected readonly dayLabels = computed(() => {
    const firstDay = this.firstDayOfWeekNumber();
    return [...weekDayLabels.slice(firstDay), ...weekDayLabels.slice(0, firstDay)];
  });

  protected readonly shortDayLabels = computed(() => {
    const firstDay = this.firstDayOfWeekNumber();
    return [...weekDayLabelsShort.slice(firstDay), ...weekDayLabelsShort.slice(0, firstDay)];
  });

  // Абстрактный метод — наследники реализуют получение дней
  protected abstract getCalendarDays(): CalendarDay[][];

  // Готовые данные для шаблона
  readonly viewData = computed<CalendarViewData>(() => ({
    rows: this.getCalendarDays(),
    dayLabels: this.dayLabels(),
    shortDayLabels: this.shortDayLabels(),
  }));

  protected isCurrentMonth(day: dayjs.Dayjs): boolean {
    return day.isSame(this.currentDate(), 'month');
  }

  protected getTransactionsForDay(day: dayjs.Dayjs): Transaction[] {
    return filterTransactionsByDay(this.transactions(), day);
  }
}
