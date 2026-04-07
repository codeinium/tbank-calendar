import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { weekDayLabelsShort } from '@/app/models/calendar/types';
import { GoalsPageStore } from '../../services/goal.service';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { GoalsInfoSkeleton } from '../goals-info-skeleton/goals-info-skeleton';

@Component({
  selector: 'app-goals-info-container',
  imports: [TuiButton, GoalsInfoSkeleton],
  templateUrl: './goals-info-container.html',
  styleUrl: './goals-info-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsInfoContainer {
  private store = inject(GoalsPageStore);

  readonly weekDayLabels = weekDayLabelsShort;

  readonly goal = this.store.selectedGoal;

  readonly loading = this.store.loadingSelectedGlobal;
  readonly restDays = computed(() => {
    const goal = this.goal();

    if (!goal?.deadline) return null;

    const now = dayjs().startOf('day');
    const end = dayjs(goal.deadline).startOf('day');

    const diff = end.diff(now, 'day');

    return Math.max(0, diff);
  });

  readonly percent = computed(() => {
    const goal = this.goal();

    if (!goal || goal.targetAmount === 0) return 0;

    return Math.round((goal.currentAmount / goal.targetAmount) * 100);
  });

  readonly listGoals = this.store.goals;

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
