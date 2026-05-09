import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { StatisticsPageService } from '../../services/statistics.service';
import { StatisticsPeriod } from '@/app/shared/types/statistics-period.type';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { MONTHS } from '@/app/features/calendar/models/types';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stats-header',
  imports: [
    FormsModule,
    TuiButton,
    TuiIcon,
    TuiTextfield,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
  ],
  templateUrl: './stats-header.html',
  styleUrl: './stats-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsHeader {
  private statisticsService = inject(StatisticsPageService);

  readonly period = signal<StatisticsPeriod>('month');

  readonly currentDate = signal(dayjs());

  readonly currentMonth = computed(() => this.currentDate().month());

  readonly currentYear = computed(() => this.currentDate().year());

  readonly months = Array.from({ length: 12 }, (_, i) => i);

  readonly years = computed(() => {
    const currentYear = this.currentYear();

    return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  });

  setPeriod(period: StatisticsPeriod) {
    this.period.set(period);
    this.emitDateChange();
  }

  goToMonth(month: number) {
    this.currentDate.update((date) => date.month(month));

    this.emitDateChange();
  }

  goToYear(year: number) {
    this.currentDate.update((date) => date.year(year));

    this.emitDateChange();
  }

  navigatePrev() {
    this.currentDate.update((date) =>
      this.period() === 'month' ? date.subtract(1, 'month') : date.subtract(1, 'year'),
    );

    this.emitDateChange();
  }

  navigateNext() {
    this.currentDate.update((date) =>
      this.period() === 'month' ? date.add(1, 'month') : date.add(1, 'year'),
    );

    this.emitDateChange();
  }

  goToday() {
    this.currentDate.set(dayjs());
    this.emitDateChange();
  }

  private emitDateChange() {
    const formattedDate =
      this.period() === 'month'
        ? this.currentDate().format('YYYY-MM')
        : this.currentDate().format('YYYY');

    this.statisticsService.changePeriod(this.period(), formattedDate);
  }

  stringifyMonth = (item: number) => MONTHS[item];

  stringifyYear = (item: number) => String(item);
}
