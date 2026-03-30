import { ChangeDetectionStrategy, Component, inject, computed, effect } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import dayjs from '@/app/shared/config/dayjs/dayjs-config'
import { CalendarSettings } from '../../components/calendar-settings/calendar-settings';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MonthView } from '../../components/month-view/month-view';
import { WeekView } from '../../components/week-view/week-view';
import { CalendarHeader } from '../../components/calendar-header/calendar-header';
import { CalendarChart } from '../../components/calendar-chart/calendar-chart';
import { TransactionService } from '@/app/models/transaction/api/transaction.service';

@Component({
  selector: 'app-calendar-page',
  imports: [CommonModule, CalendarHeader, CalendarSettings, MonthView, WeekView, CalendarChart],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  private calendar = inject(CalendarService);
  private transactionService = inject(TransactionService);

  readonly view = this.calendar.view;

  readonly range = computed(() => {
    const view = this.calendar.view();
    const date = this.calendar.currentDate();

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

  constructor() {
    effect(() => {
      const { from, to } = this.range();

      this.transactionService.loadTransactions(from, to);
    });
  }

  readonly transactions = computed(() => {
    const { from, to } = this.range();

    return this.transactionService.getTransactions(from, to);
  });
}
