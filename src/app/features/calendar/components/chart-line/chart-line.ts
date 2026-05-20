import { Component, Input, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Transaction } from '@/app/models/transaction/transaction.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-line',
  imports: [BaseChartDirective],
  templateUrl: './chart-line.html',
  styleUrl: './chart-line.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLine {
  private _transactions = signal<Transaction[]>([]);

  @Input() set transactions(value: Transaction[]) {
    this._transactions.set(value ?? []);
  }

  readonly dailyFlow = computed(() => {
    const transactions = this._transactions();
    const map = new Map<string, number>();

    transactions.forEach((t) => {
      const day = dayjs(t.date).format('YYYY-MM-DD');
      const value = t.type === 'income' ? t.amount : -t.amount;

      map.set(day, (map.get(day) ?? 0) + value);
    });

    let sorted = Array.from(map.entries()).sort(([a], [b]) =>
      dayjs(a).isAfter(dayjs(b)) ? 1 : -1,
    );

    let data = sorted.map(([date, value]) => ({
      date,
      value,
      isFake: false,
    }));

    if (data.length === 1) {
      //если за выбранный период транзакции были совершены только в один день
      const d = data[0];
      data = [
        {
          date: dayjs(d.date).subtract(1, 'day').format('YYYY-MM-DD'),
          value: 0,
          isFake: true,
        },
        d,
        { date: dayjs(d.date).add(1, 'day').format('YYYY-MM-DD'), value: 0, isFake: true },
      ];
    }

    return {
      labels: data.map((d) => dayjs(d.date).format('D')),
      data,
    };
  });

  readonly chartData = computed(() => {
    const flow = this.dailyFlow();

    return {
      labels: flow.labels,
      datasets: [
        {
          data: flow.data.map((d) => d.value),
          borderWidth: 4,
          tension: 0.4,

          borderColor: '#FFDE57',
          fill: false,
          pointRadius: 5,
          pointHoverRadius: 8,

          segment: {
            borderColor: '#B78C23',
          },
        },
      ],
    };
  });

  readonly chartOptions = {
    maintainAspectRatio: false,

    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FFDE57',
        titleColor: '#2E2E2E',
        bodyColor: '#2E2E2E',

        displayColors: false,
        callbacks: {
          title: (items: any[]) => {
            const index = items[0].dataIndex;
            const point = this.dailyFlow().data[index];
            return dayjs(point.date).format('D MMMM');
          },
          label: (ctx: any) => {
            const index = ctx.dataIndex;
            const point = this.dailyFlow().data[index];

            if (point.isFake) {
              return 'В этот день не было транзакций';
            }

            const value = ctx.raw;
            return value >= 0 ? `Доход: +${value}` : `Расход: ${value}`;
          },
        },
      },
    },

    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: {
          color: (ctx: any) => (ctx.tick.value === 0 ? '#000' : '#D7D7D7'),
          lineWidth: (ctx: any) => (ctx.tick.value === 0 ? 2 : 1),
        },
      },
    },
  } satisfies ChartConfiguration<'line'>['options'];
}
