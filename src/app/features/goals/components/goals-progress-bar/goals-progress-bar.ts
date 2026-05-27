import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GoalPageUiService } from '../../service/goal-page-ui.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-goals-progress-bar',
  imports: [NgClass],
  templateUrl: './goals-progress-bar.html',
  styleUrl: './goals-progress-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsProgressBar {
  private service = inject(GoalPageUiService);
  readonly progressData = this.service.weeklyProgress;
}
