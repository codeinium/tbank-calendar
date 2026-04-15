import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GoalsSidebar } from '../../components/goals-sidebar/goals-sidebar';
import { GoalsInfoContainer } from '../../components/goals-info-container/goals-info-container';
import { GoalsPageStore } from '../../services/goal.service';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-goals-page',
  imports: [GoalsSidebar, GoalsInfoContainer, TuiButton],
  templateUrl: './goals-page.html',
  styleUrl: './goals-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GoalsPageStore],
})
export class GoalsPageComponent {
  isSidebarOpen = signal(false);
}
