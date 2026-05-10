import { inject, Injectable } from '@angular/core';
import { forkJoin, take } from 'rxjs';

import { StatisticsPageStore } from './statistics.store';

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
    const period = this.statisticsStore.selectedPeriod();
    const date = this.statisticsStore.selectedDate();

    this.statisticsStore.startLoading();

    forkJoin({
      dashboard: this.statisticsApi.getDashboard(period, date),

      goals: this.goalsApi.getGoals(),

      subscriptions: this.subscriptionApi.getStatisticSubscriptions(period, date),
    })
      .pipe(take(1))
      .subscribe({
        next: ({ dashboard, goals, subscriptions }) => {
          this.statisticsStore.setDashboard(dashboard);

          this.statisticsStore.setGoals(goals);

          this.statisticsStore.setStatisticSubscriptions(subscriptions);

          this.statisticsStore.stopLoading();
        },

        error: (err) => {
          this.statisticsStore.setError(err.message);

          this.statisticsStore.stopLoading();
        },
      });
  }

  changePeriod(period: StatisticsPeriod, date: string) {
    this.statisticsStore.changePeriod(period, date);

    this.statisticsStore.startLoading();

    forkJoin({
      dashboard: this.statisticsApi.getDashboard(period, date),

      subscriptions: this.subscriptionApi.getStatisticSubscriptions(period, date),
    })
      .pipe(take(1))
      .subscribe({
        next: ({ dashboard, subscriptions }) => {
          this.statisticsStore.setDashboard(dashboard);

          this.statisticsStore.setStatisticSubscriptions(subscriptions);

          this.statisticsStore.stopLoading();
        },

        error: (err) => {
          this.statisticsStore.setError(err.message);

          this.statisticsStore.stopLoading();
        },
      });
  }

  changeCategoryType(type: TransactionType) {
    this.statisticsStore.changeType(type);
  }

  dashboard = this.statisticsStore.dashboard;
  loading = this.statisticsStore.loading;
  error = this.statisticsStore.error;
  categoryDistribution = this.statisticsStore.currentCategoryDistribution;
  period = this.statisticsStore.selectedPeriod;
  selectedDate = this.statisticsStore.selectedDate;
  statisticSubscriptions = this.statisticsStore.statisticSubscriptions;
  goals = this.statisticsStore.goals;
}
