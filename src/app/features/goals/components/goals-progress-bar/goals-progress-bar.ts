import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-goals-progress-bar',
  imports: [NgClass],
  templateUrl: './goals-progress-bar.html',
  styleUrl: './goals-progress-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsProgressBar {
  private service = inject(GoalService);
  readonly progressData = this.service.weeklyProgress;
}
