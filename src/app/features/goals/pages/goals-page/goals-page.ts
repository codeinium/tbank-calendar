import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { GoalsSidebar } from '../../components/goals-sidebar/goals-sidebar';
import { GoalsInfoContainer } from '../../components/goals-info-container/goals-info-container';
import { GoalsPageStore } from '../../services/goal-page.store';


@Component({
  selector: 'app-goals-page',
  imports: [GoalsSidebar, GoalsInfoContainer],
  templateUrl: './goals-page.html',
  styleUrl: './goals-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GoalsPageStore],
})
export class GoalsPageComponent {
  private store = inject(GoalsPageStore);

  ngOnInit() {
    this.store.loadGoals();
  }
}
