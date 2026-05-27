import { CalendarPageStore } from './../../store/calendar-page.store';
import { Component, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filterTransactionsByDay } from '@/app/shared/config/date/date';
import type { Transaction } from '@/app/models/transaction/transaction.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { weekDayLabels, weekDayLabelsShort } from '@/app/features/calendar/models/types';
import { PlannedCalendarPayment } from '@/app/models/planned-calendar-item/planned-calendar-item.model';

export interface CalendarDay {
  date: dayjs.Dayjs;
  isCurrentMonth: boolean;
  transactions: Transaction[];
  plannedPayments: PlannedCalendarPayment[];
}

export interface CalendarViewData {
  rows: CalendarDay[][];
  dayLabels: string[];
  shortDayLabels: string[];
}

@Component({
  imports: [CommonModule],
  template: '',
})
export abstract class BaseCalendarView {
  readonly transactions = input.required<Transaction[]>();
  readonly plannedPayments = input<PlannedCalendarPayment[]>([]);

  protected calendar = inject(CalendarPageStore);

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

  protected abstract getCalendarDays(): CalendarDay[][];

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

  protected getPlannedPaymentsForDay(day: dayjs.Dayjs): PlannedCalendarPayment[] {
    return this.plannedPayments().filter((payment) => {
      return dayjs(payment.plannedDate).isSame(day, 'day');
    });
  }
}
