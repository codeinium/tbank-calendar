import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  computed,
  inject,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartDataset, ChartOptions } from 'chart.js';
import dayjs from 'dayjs';
import { TransactionService } from '../../../../models/transaction/api/transaction.service';
import type { Transaction } from '../../../../models/transaction/model/transaction.model';

type PeriodType = 'week' | 'month' | 'year';

interface SummaryCard {
  title: string;
  amount: number;
  changePercent: number;
  changeAmount: number;
  transactionCount: number;
  categoryCount: number;
  type: 'balance' | 'income' | 'expense';
}

interface Subscription {
  name: string;
  icon: string;
  iconColor: string;
  date: string;
  amount: number;
}

interface Goal {
  name: string;
  progress: number;
  filled: number;
}

@Component({
  selector: 'app-statistic-page',
  imports: [BaseChartDirective],
  templateUrl: './statistic-page.html',
  styleUrl: './statistic-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticPageComponent implements OnInit {
  private readonly transactionService = inject(TransactionService);

  readonly period = signal<PeriodType>('month');
  readonly selectedMonth = signal<number>(10); // November (0-indexed)
  readonly selectedYear = signal<number>(2025);
  readonly donutMode = signal<'expense' | 'income'>('expense');

  // Computed summary data
  readonly summaryCards = computed<SummaryCard[]>(() => [
    {
      title: 'Текущий баланс',
      amount: 52325,
      changePercent: 7.2,
      changeAmount: 3800,
      transactionCount: 35,
      categoryCount: 10,
      type: 'balance',
    },
    {
      title: 'Доходы',
      amount: 32000,
      changePercent: -8.5,
      changeAmount: -5000,
      transactionCount: 8,
      categoryCount: 2,
      type: 'income',
    },
    {
      title: 'Траты',
      amount: 15000,
      changePercent: 35,
      changeAmount: -5000,
      transactionCount: 27,
      categoryCount: 8,
      type: 'expense',
    },
  ]);

  readonly donutData = computed(() => {
    const mode = this.donutMode();
    if (mode === 'expense') {
      return {
        labels: ['Переводы', 'Кафе & Рестораны', 'Супермаркеты', 'Образование', 'Другое'],
        data: [35, 25, 20, 15, 5],
        colors: ['#FFD54F', '#C4A35A', '#8B7D3C', '#6B632D', '#4A4520'],
        total: 15000,
      };
    }
    return {
      labels: ['Зарплата', 'Фриланс'],
      data: [85, 15],
      colors: ['#FFD54F', '#C4A35A'],
      total: 32000,
    };
  });

  readonly subscriptions = signal<Subscription[]>([
    { name: 'Яндекс Плюс', icon: 'Я', iconColor: '#FC3F1D', date: '3 ноября', amount: 650 },
    { name: 'Vk Музыка', icon: 'V', iconColor: '#0077FF', date: '15 ноября', amount: 199 },
    { name: 'Netflix', icon: 'N', iconColor: '#E50914', date: '16 ноября', amount: 633 },
  ]);

  readonly goals = signal<Goal[]>([
    { name: 'Цель 1', progress: 56, filled: 56 },
    { name: 'Цель 2', progress: 70, filled: 70 },
    { name: 'Цель 3', progress: 7, filled: 7 },
  ]);

  readonly impulsivenessIndex = signal(5);
  readonly impulsivenessAmount = signal(2250);
  readonly spendSpeedDay = signal('12 ноября');
  readonly spendSpeedPercent = signal(50);
  readonly spendSpeedDayNumber = signal(15);
  readonly spendSpeedHistory = signal({ october: 17, september: 13 });

  // Line chart data
  readonly lineChartData = computed<ChartConfiguration['data']>(() => ({
    labels: [
      '1 нояб',
      '3 нояб',
      '5 нояб',
      '7 нояб',
      '9 нояб',
      '11 нояб',
      '13 нояб',
      '15 нояб',
      '17 нояб',
      '19 нояб',
    ],
    datasets: [
      {
        label: 'Текущий месяц',
        data: [34000, 20000, 36000, 22000, 45000, 40000, 36000, 51000, 52000, 52325],
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
        label: 'Прошлый месяц',
        data: [40000, 39000, 55000, 29000, 30000, 20000, 28000, 23000, 38000, 47000],
        borderColor: '#D4B85C',
        borderDash: [6, 4],
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  }));

  readonly lineChartOptions = computed<ChartOptions>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 24,
          font: {
            size: 13,
            family: "'Inter', sans-serif",
          },
          color: '#6B632D',
          generateLabels: (chart) => {
            const data = chart.data;
            return data.datasets.map((dataset, i) => ({
              text: dataset.label || '',
              fillStyle: i === 0 ? '#D4B85C' : 'transparent',
              strokeStyle: i === 0 ? '#D4B85C' : '#D4B85C',
              lineWidth: i === 0 ? 2 : 2,
              borderDash: i === 1 ? [6, 4] : undefined,
              pointStyle: 'circle',
              hidden: false,
              index: i,
            }));
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#FFD54F',
        titleColor: '#1a1a1a',
        bodyColor: '#1a1a1a',
        titleFont: { size: 14, weight: 600 },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `₽${Number(context.parsed.y ?? 0).toLocaleString('ru-RU')}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 10000,
        max: 60000,
        ticks: {
          callback: (value) => `₽${Number(value).toLocaleString('ru-RU')}`,
          font: { size: 12, family: "'Inter', sans-serif" },
          color: '#9B9260',
          stepSize: 10000,
          padding: 12,
        },
        grid: {
          color: 'rgba(155, 146, 96, 0.2)',
          drawBorder: false,
        },
        border: { display: false },
      },
      x: {
        ticks: {
          font: { size: 12, family: "'Inter', sans-serif" },
          color: '#9B9260',
          padding: 8,
        },
        grid: { display: false },
        border: { display: false },
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
  }));

  readonly tooltipValue = signal<string>('');
  readonly tooltipVisible = signal(false);
  readonly tooltipX = signal(0);

  // Expose Math for template
  readonly Math = Math;

  readonly chartType: ChartType = 'line';

  ngOnInit() {
    this.loadTransactions();
  }

  private loadTransactions() {
    const year = this.selectedYear();
    const month = this.selectedMonth();
    const from = dayjs(`${year}-${String(month + 1).padStart(2, '0')}-01`).format('YYYY-MM-DD');
    const to = dayjs(`${year}-${String(month + 1).padStart(2, '0')}-28`).format('YYYY-MM-DD');
    this.transactionService.getTransactions(from, to).subscribe();
  }

  onPeriodChange(period: PeriodType) {
    this.period.set(period);
  }

  onDonutModeChange(mode: 'expense' | 'income') {
    this.donutMode.set(mode);
  }

  formatCurrency(value: number): string {
    return `${value.toLocaleString('ru-RU')}.00`;
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    return months[monthIndex] || '';
  }
}
