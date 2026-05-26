import { CalendarPageStore } from './../../store/calendar-page.store';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ChartView } from '@/app/features/calendar/models/types';
import { ChartLine } from '../chart-line/chart-line';
import { ChartPie } from '../chart-pie/chart-pie';
import { Transaction } from '@/app/models/transaction/transaction.model';

@Component({
  selector: 'app-calendar-chart',
  imports: [TuiButton, ChartPie, ChartLine],
  templateUrl: './calendar-chart.html',
  styleUrl: './calendar-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarChart {

  private store = inject(CalendarPageStore);

  readonly chartView = this.store.chartView;

  readonly vm = this.store.vm;

  setChartView(chartView: ChartView) {
    this.store.setChartView(chartView);
  }
}
