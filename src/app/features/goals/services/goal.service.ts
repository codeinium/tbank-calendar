import { transition } from '@angular/animations';
import { inject, Injectable, signal, computed, effect } from '@angular/core';
import { GoalsPageStore } from './goal-page.store';
import { Transaction } from '@/app/models/transaction/model/transaction.model';
import { ChartRange, GoalDetails } from '@/app/models/goal/model/goal.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';

@Injectable({ providedIn: 'root' })
export class GoalService {
  private store = inject(GoalsPageStore);

  private readonly _range = signal<ChartRange>('months');
  private readonly _selectedBucket = signal<string | null>(null);
  private readonly _isSidebarOpen = signal(false);

  readonly range = this._range.asReadonly();
  readonly selectedBucket = this._selectedBucket.asReadonly();
  readonly isSidebarOpen = this._isSidebarOpen.asReadonly();

  setIsSidebarOpen(value: boolean) {
    this._isSidebarOpen.set(value);
  }

  setRange(range: ChartRange) {
    this._range.set(range);
    this._selectedBucket.set(null);
  }

  selectBucket(key: string | null) {
    this._selectedBucket.set(key);
  }

  readonly chartData = computed(() => {
    const goal = this.store.selectedGoal();
    const transactions = this.store.transactions();
    if (!goal) return [];
    return this.buildChart(transactions ?? [], this.range());
  });

  private generatePeriods(transactions: Transaction[], range: ChartRange): string[] {
    if (!transactions || transactions.length === 0) {
      return [];
    }
    const uniquePeriods = new Set<string>();
    transactions.forEach((tx) => {
      const periodKey = this.getKey(tx.date, range);
      uniquePeriods.add(periodKey);
    });
    return Array.from(uniquePeriods).sort((a, b) => a.localeCompare(b));
  }

  private buildChart(transitions: Transaction[], range: ChartRange) {
    // генерируем периоды от создания цели до сегодня
    const periods = this.generatePeriods(transitions, range);

    const map = new Map<string, number>();
    periods.forEach((p) => map.set(p, 0));

    transitions.forEach((tx) => {
      const key = this.getKey(tx.date, range);
      if (!map.has(key)) return;
      const value = tx.type === 'income' ? -tx.amount : tx.amount;
      map.set(key, map.get(key)! + value);
    });

    // находим максимум для расчета процентов
    const max = Math.max(...Array.from(map.values()).map((v) => Math.abs(v)), 1);

    const targetAmount = this.store.selectedGoal()?.targetAmount;
    return periods.map((period) => {
      const value = map.get(period)!;
      return {
        key: period,
        topLabel: this.getTopLabel(period, range),
        bottomLabel: this.getBottomLabel(period, range),
        value,
        percent: Math.round(targetAmount ? (Math.abs(value) / targetAmount) * 100 : 0),
        percentForUi: Math.round((Math.abs(value) / max) * 100),
        isNegative: value < 0,
      };
    });
  }

  private getTopLabel(period: string, range: string) {
    const d = dayjs(period);
    if (range === 'days') return d.format('MMM-D');
    if (range === 'years') return d.format('YYYY');
    return d.format('MMM');
  }

  private getBottomLabel(period: string, range: string) {
    const d = dayjs(period);
    if (range === 'days') return d.format('YYYY');
    if (range === 'years') return;
    return d.format('YYYY');
  }

  private getKey(date: string, range: string) {
    const d = dayjs(date);
    if (range === 'days') return d.format('YYYY-MM-DD');
    if (range === 'years') return d.format('YYYY');
    return d.format('YYYY-MM');
  }

  getPeriodKey(date: string, range: 'days' | 'months' | 'years'): string {
    const d = dayjs(date);
    if (range === 'days') return d.format('YYYY-MM-DD');
    if (range === 'years') return d.format('YYYY');
    return d.format('YYYY-MM');
  }
}
