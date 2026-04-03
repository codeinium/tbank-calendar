import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tuiItemsHandlersProvider, TuiTextfield, TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-goals-sidebar',
  imports: [TuiButton],
  templateUrl: './goals-sidebar.html',
  styleUrl: './goals-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsSidebar {}
