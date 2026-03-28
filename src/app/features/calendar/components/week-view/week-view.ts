import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseCalendarView } from '../base-calendar-view/base-calendar-view';
import { DayCell } from '../day-cell/day-cell';
import { getWeekDays } from '@/app/shared/config/date/date';

@Component({
  selector: 'app-week-view',
  standalone: true,
  imports: [CommonModule, DayCell],
  templateUrl: './week-view.html',
})
export class WeekView extends BaseCalendarView {
  protected override getCalendarDays() {
    const days = getWeekDays(this.currentDate(), this.firstDayOfWeekNumber());

    return [
      days.map((date) => ({
        date,
        isCurrentMonth: this.isCurrentMonth(date),
        transactions: this.getTransactionsForDay(date),
      })),
    ];
  }
}
