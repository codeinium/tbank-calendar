import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { weekDayLabelsShort } from '@/app/models/calendar/types';
import { GoalsPageStore } from '../../services/goal-page.store';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { GoalsInfoSkeleton } from '../goals-info-skeleton/goals-info-skeleton';
import { Transaction } from '@/app/models/transaction/model/transaction.model';
import { GoalService } from '../../services/goal.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-goals-info-container',
  imports: [TuiButton, GoalsInfoSkeleton, NgClass],
  templateUrl: './goals-info-container.html',
  styleUrl: './goals-info-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsInfoContainer {
  private store = inject(GoalsPageStore);
  private goalService = inject(GoalService);
  readonly chartData = this.goalService.chartData;
  readonly transactions = this.store.transactions;
  readonly selectedBucket = this.goalService.selectedBucket;

  readonly filteredTransactions = computed(() => {
    const bucket = this.goalService.selectedBucket();
    const transactions = this.store.transactions();
    const range = this.goalService.range();

    if (!bucket) return transactions;

    return transactions.filter((t) => this.goalService.getPeriodKey(t.date, range) === bucket);
  });

  readonly periodTitle = computed(() => {
    const bucket = this.goalService.selectedBucket();
    const range = this.goalService.range();
    if (!bucket) return 'Выберите период';
    const d = dayjs(bucket);
    if (range === 'days') return d.format('D MMMM YYYY');
    if (range === 'years') return d.format('YYYY');
    return d.format('MMMM YYYY');
  });

  readonly listGoals = this.store.goals;

  readonly weekDayLabels = weekDayLabelsShort;

  readonly goal = this.store.selectedGoal;

  readonly loading = this.store.loadingSelectedGoal;
  readonly restDays = computed(() => {
    const goal = this.goal();

    if (!goal?.deadline) return null;

    const now = dayjs().startOf('day');
    const end = dayjs(goal.deadline).startOf('day');

    const diff = end.diff(now, 'day');

    return Math.max(0, diff);
  });

  setRange(range: string) {
    this.goalService.setRange(range as any);
  }

  setBucket(key: string | null) {
    this.goalService.selectBucket(key);
  }

  readonly progressPercent = computed(() => {
    const goal = this.goal();

    if (!goal || goal.targetAmount === 0) return 0;

    return Math.round((goal.currentAmount / goal.targetAmount) * 100);
  });

  readonly viewState = computed(() => {
    const goal = this.goal();
    const loading = this.loading();
    const list = this.listGoals();

    if (loading) return 'loading';
    if (!goal && !list) return 'empty';
    if (!goal && list) return 'not-selected';

    return 'ready';
  });
}
