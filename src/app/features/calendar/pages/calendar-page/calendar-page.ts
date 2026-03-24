import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { CalendarSettings } from '../../components/calendar-settings/calendar-settings';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MonthView } from '../../components/month-view/month-view';
import { WeekView } from '../../components/week-view/week-view';
import { CalendarHeader } from '../../components/calendar-header/calendar-header';
import { TransactionService } from '@/app/models/transaction/api/transaction.service';

@Component({
  selector: 'app-calendar-page',
  imports: [CommonModule, CalendarHeader, CalendarSettings, MonthView, WeekView],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  private calendar = inject(CalendarService);
  private transactionService = inject(TransactionService);

  readonly view = this.calendar.view;
  readonly transactions = this.transactionService.transactions;
  readonly loading = this.transactionService.loading;
  readonly error = this.transactionService.error;
}
