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

  readonly range = this._range.asReadonly();
  readonly selectedBucket = this._selectedBucket.asReadonly();

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
    return this.buildChart(goal, transactions ?? [], this.range());
  });

  private generatePeriods(goal: GoalDetails, range: ChartRange) {
    const start = dayjs(goal.createdAt);
    const end = dayjs();
    const result: string[] = [];
    let current = start.startOf(range === 'days' ? 'day' : range === 'years' ? 'year' : 'month');
    const endDate = end.startOf(range === 'days' ? 'day' : range === 'years' ? 'year' : 'month');
    while (current.isBefore(endDate) || current.isSame(endDate)) {
      result.push(this.getKey(current.toISOString(), range));
      current = current.add(1, range === 'days' ? 'day' : range === 'years' ? 'year' : 'month');
    }
    return result;
  }


  private buildChart(goal: GoalDetails, transitions: Transaction[], range: ChartRange) {
        // генерируем периоды от создания цели до сегодня
    const periods = this.generatePeriods(goal, range);

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
        label: this.getLabel(period, range),
        value,
        percent: Math.round(targetAmount ? (Math.abs(value) / targetAmount) * 100 : 0),
        percentForUi: Math.round((Math.abs(value) / max) * 100),
        isNegative: value < 0,
      };
    });
  }

  private getLabel(period: string, range: string) {
    const d = dayjs(period);
    if (range === 'days') return d.format('D');
    if (range === 'years') return d.format('YYYY');
    return d.format('MMM');
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
