import { Injectable, computed, signal } from '@angular/core';
import dayjs from 'dayjs';
import { Transaction } from '../../../models/transaction/transaction.model';

export interface DailyStats {
  date: string;
  income: number;
  expense: number;
  cumulativeIncome: number;
  cumulativeExpense: number;
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  fill?: boolean;
  tension?: number;
  borderDash?: number[];
  pointRadius?: number;
}

@Injectable({ providedIn: 'root' })
export class StatsService {
  private readonly _transactions = signal<Transaction[]>([]);
  private readonly _dateFrom = signal<string>('');
  private readonly _dateTo = signal<string>('');
  private readonly _budgetLine = signal<number>(0);

  readonly transactions = this._transactions.asReadonly();
  readonly dateFrom = this._dateFrom.asReadonly();
  readonly dateTo = this._dateTo.asReadonly();

  setTransactions(transactions: Transaction[]) {
    this._transactions.set(transactions);
  }

  setDateRange(from: string, to: string) {
    this._dateFrom.set(from);
    this._dateTo.set(to);
  }

  setBudgetLine(amount: number) {
    this._budgetLine.set(amount);
  }

  readonly dailyStats = computed<DailyStats[]>(() => {
    const transactions = this._transactions();
    const from = this._dateFrom();
    const to = this._dateTo();

    if (!transactions.length || !from || !to) return [];

    const dateMap = this.getDateRange(from, to);
    const stats: Record<string, { income: number; expense: number }> = {};

    // Initialize all dates with zero
    dateMap.forEach((date) => {
      stats[date] = { income: 0, expense: 0 };
    });

    // Aggregate transactions by date
    transactions.forEach((t) => {
      const date = dayjs(t.date).format('YYYY-MM-DD');
      if (stats[date]) {
        if (t.type === 'income') {
          stats[date].income += t.amount;
        } else {
          stats[date].expense += t.amount;
        }
      }
    });

    // Build cumulative stats
    const result: DailyStats[] = [];
    let cumulativeIncome = 0;
    let cumulativeExpense = 0;

    dateMap.forEach((date) => {
      const { income, expense } = stats[date];
      cumulativeIncome += income;
      cumulativeExpense += expense;

      result.push({
        date,
        income,
        expense,
        cumulativeIncome,
        cumulativeExpense,
      });
    });

    return result;
  });

  readonly chartData = computed<{ labels: string[]; datasets: ChartDataset[] }>(() => {
    const stats = this.dailyStats();
    const budgetLine = this._budgetLine();

    if (!stats.length) return { labels: [], datasets: [] };

    const labels = stats.map((s) => dayjs(s.date).format('DD.MM'));

    const maxCumulative = Math.max(
      ...stats.map((s) => Math.max(s.cumulativeIncome, s.cumulativeExpense)),
    );

    const budgetData = budgetLine > 0 ? Array(stats.length).fill(budgetLine) : [];

    return {
      labels,
      datasets: [
        {
          label: 'Доходы по дням',
          data: stats.map((s) => s.income),
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: false,
          tension: 0.3,
          pointRadius: 4,
        },
        {
          label: 'Расходы по дням',
          data: stats.map((s) => s.expense),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: false,
          tension: 0.3,
          pointRadius: 4,
        },
        {
          label: 'Кумулятивный доход',
          data: stats.map((s) => s.cumulativeIncome),
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 74, 0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 3,
        },
        {
          label: 'Кумулятивные расходы',
          data: stats.map((s) => s.cumulativeExpense),
          borderColor: '#dc2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 3,
        },
        ...(budgetLine > 0
          ? ([
              {
                label: 'Бюджетная линия',
                data: budgetData,
                borderColor: '#3b82f6',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                fill: false,
                tension: 0,
                pointRadius: 0,
              },
            ] as ChartDataset[])
          : []),
      ],
    };
  });

  private getDateRange(from: string, to: string): string[] {
    const dates: string[] = [];
    let current = dayjs(from);
    const end = dayjs(to);

    while (current.isBefore(end) || current.isSame(end)) {
      dates.push(current.format('YYYY-MM-DD'));
      current = current.add(1, 'day');
    }

    return dates;
  }
}
