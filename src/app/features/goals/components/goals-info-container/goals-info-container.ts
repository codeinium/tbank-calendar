import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { GoalsPageStore } from '../../services/goal-page.store';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { GoalsInfoSkeleton } from '../goals-info-skeleton/goals-info-skeleton';
import { GoalService } from '../../services/goal.service';
import { GoalsChart } from '../goals-chart/goals-chart';
import { GoalsHistory } from '../goals-history/goals-history';
import { GoalsProgressBar } from '../goals-progress-bar/goals-progress-bar';
import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';
import { UpdateGoalForm } from '../../forms/update-goal-form/update-goal-form';
import { AutoPayContainer } from '../auto-pay-container/auto-pay-container';

@Component({
  selector: 'app-goals-info-container',
  imports: [
    TuiButton,
    GoalsInfoSkeleton,
    GoalsChart,
    GoalsHistory,
    GoalsProgressBar,
    ModalDialog,
    UpdateGoalForm,
    AutoPayContainer
  ],
  templateUrl: './goals-info-container.html',
  styleUrl: './goals-info-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsInfoContainer {
  private store = inject(GoalsPageStore);
  private goalService = inject(GoalService);
  readonly listGoals = this.store.goals;
  readonly goal = this.store.selectedGoal;
  readonly range = this.goalService.range;
  readonly isHardModeOn = computed(() => this.goal()?.hardMode ?? false);

  isUpdateModalOpen = signal(false);

  openUpdateModal() {
    this.isUpdateModalOpen.set(true);
  }

  closeUpdateModal() {
    this.isUpdateModalOpen.set(false);
  }

  readonly loading = this.store.loadingSelectedGoal;
  readonly restDays = computed(() => {
    const goal = this.goal();

    if (!goal?.deadline) return null;

    const now = dayjs().startOf('day');
    const end = dayjs(goal.deadline).startOf('day');

    const diff = end.diff(now, 'day');

    return Math.max(0, diff);
  });

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
