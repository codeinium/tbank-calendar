import { ChartRange } from '@/app/models/types/chart-range.type';
import { inject, Injectable, signal, computed } from '@angular/core';
import { GoalsPageStore } from '../store/goal-page.store';
import { Transaction } from '@/app/models/transaction/transaction.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { weekDayLabelsShort } from '@/app/features/calendar/models/types';

@Injectable()
export class GoalPageUiService {
  private readonly store = inject(GoalsPageStore);

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
    const transactions = this.store.transactions();

    return this.buildChart(transactions ?? [], this.range());
  });

  readonly weeklyProgress = computed(() => {
    const transactions = this.store.transactions();
    const startOfWeek = dayjs().startOf('week');
    const daysData = [];

    if (!transactions || transactions.length === 0) {
      for (let i = 0; i < 7; i++) {
        const currentDay = startOfWeek.add(i, 'day');

        daysData.push({
          dayName: weekDayLabelsShort[currentDay.day()],
          isActive: false,
          isToday: currentDay.isSame(dayjs(), 'day'),
          dateKey: currentDay.format('YYYY-MM-DD'),
        });
      }

      return { streak: 0, days: daysData };
    }

    const activeDates = new Set<string>();

    transactions.forEach((tx) => {
      activeDates.add(dayjs(tx.date).format('YYYY-MM-DD'));
    });

    const streak = this.calculateStreak(activeDates);

    for (let i = 0; i < 7; i++) {
      const currentDay = startOfWeek.add(i, 'day');
      const dateKey = currentDay.format('YYYY-MM-DD');

      daysData.push({
        dayName: weekDayLabelsShort[currentDay.day()],
        isActive: activeDates.has(dateKey),
        isToday: currentDay.isSame(dayjs(), 'day'),
        dateKey,
      });
    }

    return { streak, days: daysData };
  });

  getPeriodKey(date: string, range: ChartRange): string {
    const d = dayjs(date);

    if (range === 'days') return d.format('YYYY-MM-DD');
    if (range === 'years') return d.format('YYYY');

    return d.format('YYYY-MM');
  }

  private generatePeriods(transactions: Transaction[], range: ChartRange): string[] {
    if (!transactions.length) return [];

    const uniquePeriods = new Set<string>();

    transactions.forEach((tx) => {
      uniquePeriods.add(this.getPeriodKey(tx.date, range));
    });

    return Array.from(uniquePeriods).sort((a, b) => a.localeCompare(b));
  }

  private buildChart(transactions: Transaction[], range: ChartRange) {
    const periods = this.generatePeriods(transactions, range);
    const map = new Map<string, number>();

    periods.forEach((period) => map.set(period, 0));

    transactions.forEach((tx) => {
      const key = this.getPeriodKey(tx.date, range);

      if (!map.has(key)) return;

      const value = tx.type === 'income' ? -tx.amount : tx.amount;

      map.set(key, map.get(key)! + value);
    });

    const max = Math.max(...Array.from(map.values()).map((value) => Math.abs(value)), 1);
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

  private getTopLabel(period: string, range: ChartRange) {
    const d = dayjs(period);

    if (range === 'days') return d.format('MMM-D');
    if (range === 'years') return d.format('YYYY');

    return d.format('MMM');
  }

  private getBottomLabel(period: string, range: ChartRange) {
    const d = dayjs(period);

    if (range === 'days') return d.format('YYYY');
    if (range === 'years') return '';

    return d.format('YYYY');
  }

  private calculateStreak(activeDates: Set<string>): number {
    let streak = 0;
    let currentDate = dayjs().startOf('day');

    if (!activeDates.has(currentDate.format('YYYY-MM-DD'))) {
      currentDate = currentDate.subtract(1, 'day');
    }

    while (activeDates.has(currentDate.format('YYYY-MM-DD'))) {
      streak++;
      currentDate = currentDate.subtract(1, 'day');
    }

    return streak;
  }
}
