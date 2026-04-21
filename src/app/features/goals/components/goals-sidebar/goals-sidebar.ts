import { CreateGoalForm } from './../create-goal-form/create-goal-form';
import { NgClass } from '@angular/common';
import { GoalsPageStore } from '../../services/goal-page.store';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goals-sidebar',
  imports: [TuiButton, NgClass, CreateGoalForm, ModalDialog],
  templateUrl: './goals-sidebar.html',
  styleUrl: './goals-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsSidebar {
  private store = inject(GoalsPageStore);
  private service = inject(GoalService);

  goals = this.store.goals;
  selectedGoal = this.store.selectedGoal;
  isCreateModalOpen = signal(false);

  isSidebarOpen = this.service.isSidebarOpen;

  toogleSidebar(value: boolean) {
    this.service.setIsSidebarOpen(value);
  }


  ngOnInit() {
    this.store.loadGoals();
  }

  selectGoal(id: string) {
    this.store.selectGoal(id);
    this.toogleSidebar(false);
  }

  openModal() {
    this.isCreateModalOpen.set(true);
  }

  closeModal() {
    this.isCreateModalOpen.set(false);
  }
}
