import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseCalendarView } from '../base-calendar-view/base-calendar-view';
import { DayCell } from '../day-cell/day-cell';
import { getMonthWeeks } from '@/app/shared/config/date/date';

@Component({
  selector: 'app-month-view',
  imports: [CommonModule, DayCell],
  templateUrl: './month-view.html',
})
export class MonthView extends BaseCalendarView {
  protected override getCalendarDays() {
    const weeks = getMonthWeeks(this.currentDate(), this.firstDayOfWeekNumber());

    return weeks.map((week) =>
      week.map((date) => ({
        date,
        isCurrentMonth: this.isCurrentMonth(date),
        transactions: this.getTransactionsForDay(date),
      })),
    );
  }
}
