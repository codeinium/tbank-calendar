import { CalendarPageStore } from './../../store/calendar-page.store';
import { CalendarPageService } from '../../services/calendar.service';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MONTHS, WeekItem } from '@/app/features/calendar/models/types';
import { getMonthWeeksList } from '@/app/shared/config/date/date';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { CommonModule } from '@angular/common';
import { TuiTextfield, TuiButton, TuiIcon } from '@taiga-ui/core';
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
})
export class CalendarHeader {
  private readonly store = inject(CalendarPageStore);
  private readonly pageService = inject(CalendarPageService);

  readonly currentDate = this.store.currentDate;
  readonly view = this.store.view;
  readonly firstDayOfWeekNumber = this.store.firstDayOfWeekNumber;

  navigatePrev = () => this.pageService.navigatePrev();
  navigateNext = () => this.pageService.navigateNext();
  goToday = () => this.pageService.goToday();
  goToMonth = (month: number) => this.pageService.goToMonth(month);
  goToYear = (year: number) => this.pageService.goToYear(year);
  goToWeek = (isoString: string) => this.pageService.goToWeek(dayjs(isoString));

  readonly currentMonth = computed(() => this.currentDate().month());
  readonly currentYear = computed(() => this.currentDate().year());

  readonly currentWeek = computed((): WeekItem | null => {
    const weeksList = this.weeks();
    const currentStart = this.currentDate().startOf('week').day(this.firstDayOfWeekNumber());

    return weeksList.find((week) => week.start.isSame(currentStart, 'day')) ?? null;
  });

  readonly months = Array.from({ length: 12 }, (_, i) => i);

  readonly weeks = computed((): WeekItem[] => {
    return getMonthWeeksList(this.currentDate(), this.firstDayOfWeekNumber());
  });

  readonly years = computed(() => {
    const year = this.currentYear();

    return Array.from({ length: 11 }, (_, i) => year - 9 + i);
  });

  stringifyMonth = (item: number) => MONTHS[item];
  stringifyYear = (item: number) => String(item);
  stringifyWeek = (item: WeekItem) => item.label;
}
