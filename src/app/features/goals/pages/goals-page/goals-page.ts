import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GoalsSidebar } from '../../components/goals-sidebar/goals-sidebar';
import { GoalsInfoContainer } from '../../components/goals-info-container/goals-info-container';
import { GoalsPageStore } from '../../services/goal-page.store';
import { TuiButton } from '@taiga-ui/core';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goals-page',
  imports: [GoalsSidebar, GoalsInfoContainer, TuiButton],
  templateUrl: './goals-page.html',
  styleUrl: './goals-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class GoalsPageComponent {
  private service = inject(GoalService);
  readonly isSidebarOpen = this.service.isSidebarOpen;
  setIsSidebarOpen(value: boolean) {
    this.service.setIsSidebarOpen(value);
  }
}
