import { ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { GoalsPageStore } from '../../services/goal-page.store';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { GoalsInfoSkeleton } from '../goals-info-skeleton/goals-info-skeleton';
import { GoalService } from '../../services/goal.service';
import { GoalsChart } from '../goals-chart/goals-chart';
import { GoalsHistory } from '../goals-history/goals-history';
import { GoalsProgressBar } from '../goals-progress-bar/goals-progress-bar';

@Component({
  selector: 'app-goals-info-container',
  imports: [TuiButton, GoalsInfoSkeleton, GoalsChart, GoalsHistory, GoalsProgressBar],
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
