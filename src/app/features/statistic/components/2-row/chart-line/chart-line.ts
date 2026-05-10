import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-line',
  imports: [BaseChartDirective],
  templateUrl: './chart-line.html',
  styleUrl: './chart-line.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLine {
  private statsService = inject(StatisticsPageService);

  readonly dashboard = this.statsService.dashboard;

  private readonly balanceHistory = computed(() => {
    return this.dashboard()?.balanceHistory;
  });

  readonly lineChartData = computed<ChartConfiguration['data']>(() => {
    const history = this.balanceHistory();

    if (!history) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const current = history.currentPeriod;
    const previous = history.previousPeriod;

    return {
      labels: current.map((item) => this.formatLabel(item.date, history.granularity)),

      datasets: [
        {
          label: 'Текущий период',
          data: current.map((item) => item.amount),

          borderColor: '#D4B85C',
          backgroundColor: 'rgba(212, 184, 92, 0.1)',

          fill: false,
          tension: 0.4,

          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#FFD54F',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 3,

          borderWidth: 2.5,
        },

        {
          label: 'Прошлый период',
          data: previous.map((item) => item.amount),

          borderColor: '#FFDE57',
          borderDash: [6, 4],

          backgroundColor: 'transparent',
          fill: false,
          tension: 0.4,

          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
      ],
    };
  });

  readonly lineChartOptions = computed<ChartOptions>(() => {
    const history = this.balanceHistory();

    const allValues = [
      ...(history?.currentPeriod.map((i) => i.amount) ?? []),
      ...(history?.previousPeriod.map((i) => i.amount) ?? []),
    ];

    const min = Math.min(...allValues, 0);
    const max = Math.max(...allValues, 1000);

    return {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          enabled: true,
          backgroundColor: '#FFD54F',
          titleColor: '#1a1a1a',
          bodyColor: '#1a1a1a',
          displayColors: false,

          callbacks: {
            label: (context) => `₽${Number(context.parsed.y ?? 0).toLocaleString('ru-RU')}`,
          },
        },
      },

      scales: {
        y: {
          beginAtZero: false,
          min,
          max,

          ticks: {
            callback: (value) => `₽${Number(value).toLocaleString('ru-RU')}`,
            color: '#9B9260',
            padding: 12,
          },

          grid: {
            color: 'rgba(155,146,96,0.2)',
            drawBorder: false,
          },

          border: {
            display: false,
          },
        },

        x: {
          ticks: {
            color: '#9B9260',
            padding: 8,
          },

          grid: {
            display: false,
          },

          border: {
            display: false,
          },
        },
      },

      interaction: {
        mode: 'index',
        intersect: false,
      },

      elements: {
        point: {
          radius: 0,
        },
      },
    };
  });

  private formatLabel(date: string, granularity: string): string {
    const parsed = dayjs(date);

    if (granularity === 'month') {
      return parsed.format('D MMM');
    }

    if (granularity === 'year') {
      return parsed.format('MMM');
    }

    return parsed.format('DD.MM');
  }
}
