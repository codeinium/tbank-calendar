import { TransactionType } from '../../../models/types/transaction.type';
import { Injectable, computed, signal } from '@angular/core';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { ImpulseIndex, StatisticsDashboard } from '@/app/models/statistic/statistics.model';
import { StatisticsPeriod } from '@/app/shared/types/statistics-period.type';
import { StatisticSubscriptions } from '@/app/models/subscription/subscription.model';
import { Goal } from '@/app/models/goal/goal.model';

export type LoadingType = 'dashboard' | 'goals' | 'subscriptions';

@Injectable()
export class StatisticsPageStore {
  private readonly _dashboard = signal<StatisticsDashboard | null>(null);

  private readonly _loadingDashboard = signal(false);
  private readonly _loadingGoals = signal(false);
  private readonly _loadingSubscriptions = signal(false);

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

  readonly loadingDashboard = this._loadingDashboard.asReadonly();
  readonly loadingGoals = this._loadingGoals.asReadonly();
  readonly loadingSubscriptions = this._loadingSubscriptions.asReadonly();

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

  changePeriod(period: StatisticsPeriod, date: string) {
    this._period.set(period);
    this._date.set(date);
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

  startLoading(type: LoadingType) {
    if (type === 'dashboard') this._loadingDashboard.set(true);
    if (type === 'goals') this._loadingGoals.set(true);
    if (type === 'subscriptions') this._loadingSubscriptions.set(true);
  }

  stopLoading(type: LoadingType) {
    if (type === 'dashboard') this._loadingDashboard.set(false);
    if (type === 'goals') this._loadingGoals.set(false);
    if (type === 'subscriptions') this._loadingSubscriptions.set(false);
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

  readonly range = computed(() => {
    const period = this._period();
    const date = this._date();

    if (period === 'month') {
      return {
        from: dayjs(date).startOf('month').toISOString(),
        to: dayjs(date).endOf('month').toISOString(),
      };
    }
    return {
      from: dayjs(date).startOf('year').toISOString(),
      to: dayjs(date).endOf('year').toISOString(),
    };
  });
}
