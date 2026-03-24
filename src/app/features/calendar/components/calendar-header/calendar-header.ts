import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarService } from '../../pages/services/calendar.service';
import { MONTHS, WeekItem } from '@/app/models/calendar/types';
import { formatWeekRange, getMonthWeeksList } from '@/app/shared/config/date/date';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { CommonModule } from '@angular/common';
import { tuiItemsHandlersProvider, TuiTextfield, TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';


@Component({
  selector: 'app-calendar-header',
  imports: [
    FormsModule,
    CommonModule,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
    TuiTextfield,
    TuiButton,
    TuiIcon,
  ],
  templateUrl: './calendar-header.html',
  styleUrl: './calendar-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class CalendarHeader {
  private calendar = inject(CalendarService);

  readonly currentDate = this.calendar.currentDate;
  readonly view = this.calendar.view;
  readonly firstDayOfWeekNumber = this.calendar.firstDayOfWeekNumber;

  navigatePrev = () => this.calendar.navigatePrev();
  navigateNext = () => this.calendar.navigateNext();
  goToday = () => this.calendar.goToday();
  goToMonth = (month: number) => this.calendar.goToMonth(month);
  goToYear = (year: number) => this.calendar.goToYear(year);
  goToWeek = (isoString: string) => this.calendar.goToWeek(dayjs(isoString));

  readonly currentMonth = computed(() => this.currentDate().month());
  readonly currentYear = computed(() => this.currentDate().year());
  readonly currentWeek = computed((): WeekItem | null => {
    const weeksList = this.weeks();
    const currentStart = this.currentDate().startOf('week').day(this.firstDayOfWeekNumber());
    return weeksList.find((w) => w.start.isSame(currentStart, 'day')) ?? null;
  });

  readonly months = Array.from({ length: 12 }, (_, i) => i);
  readonly weeks = computed((): WeekItem[] =>
    getMonthWeeksList(this.currentDate(), this.firstDayOfWeekNumber()),
  );
  readonly years = computed(() => {
    const year = this.currentYear();
    return Array.from({ length: 11 }, (_, i) => year - 5 + i);
  });

  stringifyMonth = (item: number) => MONTHS[item];
  stringifyYear = (item: number) => String(item);
  stringifyWeek = (item: WeekItem) => (item as WeekItem).label;
}
