import { inject, Injectable } from '@angular/core';
import { forkJoin, take } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { StatisticsPageStore, LoadingType } from './statistics.store';
import { StatisticsService } from '@/app/services/statistic/statistics.service';
import { ReminderPaymentService } from '@/app/services/reminder-payment/reminder-payment.service';
import { GoalsService } from '@/app/services/goal/goal.service';
import { StatisticsPeriod } from '@/app/shared/types/statistics-period.type';
import { TransactionType } from '@/app/models/types/transaction.type';

@Injectable()
export class StatisticsPageService {
  private statisticsStore = inject(StatisticsPageStore);
  private statisticsApi = inject(StatisticsService);
  private goalsApi = inject(GoalsService);
  private subscriptionApi = inject(ReminderPaymentService);

  loadPage() {
    const { from, to } = this.statisticsStore.range();
    const loaders: LoadingType[] = ['dashboard', 'goals', 'subscriptions'];

    loaders.forEach((type) => this.statisticsStore.startLoading(type));

    forkJoin({
      dashboard: this.statisticsApi.getDashboard(from, to),
      goals: this.goalsApi.getGoals(),
      subscriptions: this.subscriptionApi.getStatisticSubscriptions(from, to),
    })
      .pipe(
        take(1),
        finalize(() => loaders.forEach((type) => this.statisticsStore.stopLoading(type))),
      )
      .subscribe({
        next: ({ dashboard, goals, subscriptions }) => {
          this.statisticsStore.setDashboard(dashboard);
          this.statisticsStore.setGoals(goals);
          this.statisticsStore.setStatisticSubscriptions(subscriptions);
        },
        error: (err) => {
          this.statisticsStore.setError(err.message);
        },
      });
  }

  changePeriod(period: StatisticsPeriod, date: string) {
    this.statisticsStore.changePeriod(period, date);
    const { from, to } = this.statisticsStore.range();

    const loaders: LoadingType[] = ['dashboard', 'subscriptions'];
    loaders.forEach((type) => this.statisticsStore.startLoading(type));

    forkJoin({
      dashboard: this.statisticsApi.getDashboard(from, to),
      subscriptions: this.subscriptionApi.getStatisticSubscriptions(from, to),
    })
      .pipe(
        take(1),
        finalize(() => loaders.forEach((type) => this.statisticsStore.stopLoading(type))),
      )
      .subscribe({
        next: ({ dashboard, subscriptions }) => {
          this.statisticsStore.setDashboard(dashboard);
          this.statisticsStore.setStatisticSubscriptions(subscriptions);
        },
        error: (err) => {
          this.statisticsStore.setError(err.message);
        },
      });
  }

  changeCategoryType(type: TransactionType) {
    this.statisticsStore.changeType(type);
  }

  readonly loadingDashboard = this.statisticsStore.loadingDashboard;
  readonly loadingGoals = this.statisticsStore.loadingGoals;
  readonly loadingSubscriptions = this.statisticsStore.loadingSubscriptions;

  readonly dashboard = this.statisticsStore.dashboard;
  readonly error = this.statisticsStore.error;
  readonly categoryDistribution = this.statisticsStore.currentCategoryDistribution;
  readonly period = this.statisticsStore.selectedPeriod;
  readonly selectedDate = this.statisticsStore.selectedDate;
  readonly statisticSubscriptions = this.statisticsStore.statisticSubscriptions;
  readonly goals = this.statisticsStore.goals;
}
