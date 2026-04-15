import { CreateGoalForm } from './../create-goal-form/create-goal-form';
import { NgClass } from '@angular/common';
import { GoalsPageStore } from './../../services/goal.service';
import { ChangeDetectionStrategy, Component, inject, signal, } from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';

@Component({
  selector: 'app-goals-sidebar',
  imports: [TuiButton, NgClass, CreateGoalForm, ModalDialog],
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
