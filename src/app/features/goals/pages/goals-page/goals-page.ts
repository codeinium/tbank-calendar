import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GoalsSidebar } from '../../components/goals-sidebar/goals-sidebar'; 
import { GoalsInfoContainer } from '../../components/goals-info-container/goals-info-container';

@Component({
  selector: 'app-goals-page',
  imports: [ GoalsSidebar, GoalsInfoContainer],
  templateUrl: './goals-page.html',
  styleUrl: './goals-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsPageComponent {
  
}
