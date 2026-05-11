import { Goal } from './../../../../../models/goal/goal.model';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import { SkeletonLine } from "@/app/shared/components/skeleton-line/skeleton-line";

@Component({
  selector: 'app-goals-stat-card',
  imports: [SkeletonLine],
  templateUrl: './goals-stat-card.html',
  styleUrl: './goals-stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsStatCard {
  private service = inject(StatisticsPageService);
  readonly goals = computed(() => this.service.goals());
  readonly loading = computed(() => this.service.loadingGoals())

  progressPercent(goal: Goal) {
    return Math.round((goal.currentAmount / goal.targetAmount) * 100);
  }
}
