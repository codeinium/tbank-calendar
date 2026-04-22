import { CreateGoalForm } from '../../forms/create-goal-form/create-goal-form';
import { NgClass } from '@angular/common';
import { GoalsPageStore } from '../../services/goal-page.store';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';
import { GoalService } from '../../services/goal.service';
import { GoalsSidebarSkeleton } from '../goals-sidebar-skeleton/goals-sidebar-skeleton';

@Component({
  selector: 'app-goals-sidebar',
  imports: [TuiButton, NgClass, CreateGoalForm, ModalDialog, GoalsSidebarSkeleton],
  templateUrl: './goals-sidebar.html',
  styleUrl: './goals-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsSidebar {
  private store = inject(GoalsPageStore);
  private service = inject(GoalService);
  readonly loading = this.store.loadingList;
  goals = this.store.goals;
  selectedGoal = this.store.selectedGoal;
  isCreateModalOpen = signal(false);

  isSidebarOpen = this.service.isSidebarOpen;

  toggleSidebar(value: boolean) {
    this.service.setIsSidebarOpen(value);
  }
  readonly viewState = computed(() => {
    const loading = this.loading();

    if (loading) return 'loading';
    if (!this.goals && !loading) return 'empty';
    return 'ready';
  });
  ngOnInit() {
    this.store.loadGoals();
  }

  selectGoal(id: string) {
    this.store.selectGoal(id);
    this.toggleSidebar(false);
  }

  openModal() {
    this.isCreateModalOpen.set(true);
  }

  closeModal() {
    this.isCreateModalOpen.set(false);
  }
}
