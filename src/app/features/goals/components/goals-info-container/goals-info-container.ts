import { GoalPageUiService } from './../../service/goal-page-ui.service';
import { GoalsPageStore } from '../../store/goal-page.store';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { GoalsInfoSkeleton } from '../goals-info-skeleton/goals-info-skeleton';
import { GoalsChart } from '../goals-chart/goals-chart';
import { GoalsHistory } from '../goals-history/goals-history';
import { GoalsProgressBar } from '../goals-progress-bar/goals-progress-bar';
import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';
import { UpdateGoalForm } from '../../forms/update-goal-form/update-goal-form';
import { AutoPayContainer } from '../auto-pay-container/auto-pay-container';
import { ContributeGoalForm } from "../../forms/contribute-goal-form/contribute-goal-form";
import { WithdrawGoalForm } from "../../forms/withdraw-goal-form/withdraw-goal-form";
import { DeleteGoalForm } from "../../forms/delete-goal-form/delete-goal-form";

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
    AutoPayContainer,
    ContributeGoalForm,
    WithdrawGoalForm,
    DeleteGoalForm
],
  templateUrl: './goals-info-container.html',
  styleUrl: './goals-info-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsInfoContainer {
  private store = inject(GoalsPageStore);
  private goalService = inject(GoalPageUiService);
  readonly listGoals = this.store.goals;
  readonly goal = this.store.selectedGoal;
  readonly range = this.goalService.range;
  readonly isHardModeOn = computed(() => this.goal()?.hardMode ?? false);

  isUpdateModalOpen = signal(false);
  isContributeModalOpen = signal(false);
  isWithdrawModalOpen = signal(false);
  isDeleteTheGoalModalOpen = signal(false);

  openUpdateModal() {
    this.isUpdateModalOpen.set(true);
  }

  closeUpdateModal() {
    this.isUpdateModalOpen.set(false);
  }

  openContributeModal() {
    this.isContributeModalOpen.set(true);
  }

  closeContributeModal() {
    this.isContributeModalOpen.set(false);
  }

  openWithdrawModal() {
    this.isWithdrawModalOpen.set(true);
  }

  closeWithdraweModal() {
    this.isWithdrawModalOpen.set(false);
  }

  openDeleteTheGoalModal() {
    this.isDeleteTheGoalModalOpen.set(true);
  }

  closeDeleteTheGoalModal() {
    this.isDeleteTheGoalModalOpen.set(false);
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
