import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GoalsSidebar } from '../../components/goals-sidebar/goals-sidebar';
import { GoalsInfoContainer } from '../../components/goals-info-container/goals-info-container';

import { GoalsPageService } from '../../service/goal.service';
import { GoalsPageStore } from '../../store/goal-page.store';
import { GoalPageUiService } from '../../service/goal-page-ui.service';

@Component({
  selector: 'app-goals-page',
  imports: [GoalsSidebar, GoalsInfoContainer],
  templateUrl: './goals-page.html',
  styleUrl: './goals-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GoalsPageStore, GoalsPageService, GoalPageUiService],
})
export class GoalsPageComponent {
  private readonly goalsPageService = inject(GoalsPageService);

  ngOnInit() {
    this.goalsPageService.loadGoals();
    this.goalsPageService.loadAccounts();
  }
}
