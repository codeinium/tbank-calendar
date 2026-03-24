import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { CalendarSettings } from '../../components/calendar-settings/calendar-settings';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MonthView } from '../../components/month-view/month-view';
import { WeekView } from '../../components/week-view/week-view';
import { CalendarHeader } from '../../components/calendar-header/calendar-header';


@Component({
  selector: 'app-calendar-page',
  imports: [ CommonModule, CalendarHeader, CalendarSettings],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  // view$;

  // constructor(public calendarService: CalendarService) {
  //   this.view$ = this.calendarService.viewObs;
  // }
}
