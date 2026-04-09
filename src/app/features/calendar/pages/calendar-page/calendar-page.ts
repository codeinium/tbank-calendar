import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarHeader } from '../../components/calendar-header/calendar-header';
import { CalendarSettings } from '../../components/calendar-settings/calendar-settings';
import { MonthView } from '../../components/month-view/month-view';
import { WeekView } from '../../components/week-view/week-view';
import { CalendarChart } from '../../components/calendar-chart/calendar-chart';

import { CalendarService } from '../../services/calendar.service';
import { CalendarPageStore } from '../../services/calendar-page.store';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [CommonModule, CalendarHeader, CalendarSettings, MonthView, WeekView, CalendarChart],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CalendarPageStore],
})
export class CalendarPageComponent {
  readonly calendar = inject(CalendarService);
  readonly store = inject(CalendarPageStore);

  readonly view = this.calendar.view;
  readonly vm = this.store.vm;
}
