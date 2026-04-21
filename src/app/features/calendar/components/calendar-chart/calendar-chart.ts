import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { CalendarService } from '../../services/calendar.service';
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
  @Input() transactions: Transaction[] = [];

  private service = inject(CalendarService);

  readonly chartView = this.service.chartView;

  setChartView(chartView: ChartView) {
    this.service.setChartView(chartView);
  }
}
