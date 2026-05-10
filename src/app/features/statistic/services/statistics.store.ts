import { TransactionType } from '../../../models/types/transaction.type';
import { Injectable, computed, inject, signal } from '@angular/core';

import { StatisticsService } from '@/app/services/statistic/statistics.service';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { ImpulseIndex, StatisticsDashboard } from '@/app/models/statistic/statistics.model';

import { StatisticsPeriod } from '@/app/shared/types/statistics-period.type';
import { StatisticSubscriptions } from '@/app/models/subscription/subscription.model';
import { Goal } from '@/app/models/goal/goal.model';

@Injectable()
export class StatisticsPageStore {
  private api = inject(StatisticsService);

  private readonly _dashboard = signal<StatisticsDashboard | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _period = signal<StatisticsPeriod>('month');
  private readonly _date = signal(this.getCurrentMonth());
  private readonly _selectedType = signal<TransactionType>('expense');
  private readonly _statisticSubscriptions = signal<StatisticSubscriptions | null>(null);
  private readonly _goals = signal<Goal[]>([]);
  private readonly _impulseIndex = signal<ImpulseIndex | null>(null);

  readonly selectedDate = this._date.asReadonly();
  readonly selectedPeriod = this._period.asReadonly();
  readonly dashboard = this._dashboard.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly selectedType = this._selectedType.asReadonly();
  readonly statisticSubscriptions = this._statisticSubscriptions.asReadonly();
  readonly goals = this._goals.asReadonly();
  readonly impulseIndex = this._impulseIndex.asReadonly();

  readonly currentCategoryDistribution = computed(() => {
    const dashboard = this._dashboard();

    if (!dashboard) return null;

    return this._selectedType() === 'expense'
      ? dashboard.categoryDistribution.expenses
      : dashboard.categoryDistribution.income;
  });

  load() {
    this._loading.set(true);

    this.api.getDashboard(this._period(), this._date()).subscribe({
      next: (response) => {
        this._loading.set(false);
        this._dashboard.set(response);
      },
      error: () => {
        this._loading.set(false);
        this._error.set('Failed to load statistics');
      },
    });
  }

  changePeriod(period: StatisticsPeriod, date: string) {
    this._period.set(period);
    this._date.set(date);

    this.load();
  }

  changeType(type: TransactionType) {
    this._selectedType.set(type);
  }

  private getCurrentMonth() {
    const now = dayjs();
    return `${now.year()}-${String(now.month() + 1).padStart(2, '0')}`;
  }

  setDashboard(dashboard: StatisticsDashboard) {
    this._dashboard.set(dashboard);
  }

  startLoading() {
    this._loading.set(true);
  }

  stopLoading() {
    this._loading.set(false);
  }

  setError(message: string) {
    this._error.set(message);
  }

  setStatisticSubscriptions(data: StatisticSubscriptions) {
    this._statisticSubscriptions.set(data);
  }

  setGoals(goals: Goal[]) {
    this._goals.set(goals);
  }
}
