import { Component, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayCell } from '../day-cell/day-cell';
import { CalendarService } from '@/app/features/calendar/services/calendar.service';
import { getMonthWeeks, filterTransactionsByDay } from '@/app/shared/config/date/date';
import type { Transaction } from '@/app/models/transaction/model/transaction.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';

@Component({
  selector: 'app-month-view',
  standalone: true,
  imports: [CommonModule, DayCell],
  templateUrl: './month-view.html',
})
export class MonthView {
  readonly transactions = input.required<Transaction[]>();

  private calendar = inject(CalendarService);

  readonly currentDate = this.calendar.currentDate;
  readonly firstDayOfWeekNumber = this.calendar.firstDayOfWeekNumber;

  readonly weeks = computed(() => getMonthWeeks(this.currentDate(), this.firstDayOfWeekNumber()));


  private readonly weekDayLabels = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];

  private readonly weekDayLabelsShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  readonly orderedLabels = computed(() => {
    const firstDay = this.firstDayOfWeekNumber();
    return [...this.weekDayLabels.slice(firstDay), ...this.weekDayLabels.slice(0, firstDay)];
  });

  readonly orderedShortLabels = computed(() => {
    const firstDay = this.firstDayOfWeekNumber();
    return [
      ...this.weekDayLabelsShort.slice(firstDay),
      ...this.weekDayLabelsShort.slice(0, firstDay),
    ];
  });

  isCurrentMonth(day: dayjs.Dayjs): boolean {
    return day.isSame(this.currentDate(), 'month');
  }

  getTransactionsForDay(day: dayjs.Dayjs): Transaction[] {
    return filterTransactionsByDay(this.transactions(), day);
  }
}
