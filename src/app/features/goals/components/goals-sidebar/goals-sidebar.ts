import { CreateGoalForm } from './../create-goal-form/create-goal-form';
import { NgClass } from '@angular/common';
import { GoalsPageStore } from './../../services/goal.service';
import { ChangeDetectionStrategy, Component, inject, signal, } from '@angular/core';
import { tuiItemsHandlersProvider, TuiTextfield, TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiDialogService } from '@taiga-ui/core';

@Component({
  selector: 'app-goals-sidebar',
  imports: [TuiButton, NgClass, CreateGoalForm],
  templateUrl: './goals-sidebar.html',
  styleUrl: './goals-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsSidebar {
  private store = inject(GoalsPageStore);

  goals = this.store.goals;
  selectedGoal = this.store.selectedGoal;

  isCreateModalOpen = signal(false);

  ngOnInit() {
    this.store.loadGoals();
  }

  selectGoal(id: string) {
    this.store.selectGoal(id);
  }

  openModal() {
    this.isCreateModalOpen.set(true);
  }

  closeModal() {
    this.isCreateModalOpen.set(false);
  }
}
