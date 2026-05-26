import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayModal } from '../../components/day-modal/day-modal';
import { CalendarHeader } from '../../components/calendar-header/calendar-header';
import { CalendarSettings } from '../../components/calendar-settings/calendar-settings';
import { MonthView } from '../../components/month-view/month-view';
import { WeekView } from '../../components/week-view/week-view';
import { CalendarChart } from '../../components/calendar-chart/calendar-chart';

import { CalendarPageService } from '../../services/calendar.service';
import { CalendarPageStore } from '../../store/calendar-page.store';

@Component({
  selector: 'app-calendar-page',
  imports: [
    CommonModule,
    CalendarHeader,
    CalendarSettings,
    MonthView,
    WeekView,
    CalendarChart,
    DayModal,
  ],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CalendarPageStore, CalendarPageService],
})
export class CalendarPageComponent {
  readonly store = inject(CalendarPageStore);
  readonly pageService = inject(CalendarPageService);

  readonly view = this.store.view;
  readonly vm = this.store.vm;

  ngOnInit() {
    this.pageService.loadTransactions();
  }
}
