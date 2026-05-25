import { CreateGoalForm } from '../../forms/create-goal-form/create-goal-form';
import { NgClass } from '@angular/common';
import { GoalsPageStore } from '../../store/goal-page.store';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';
import { GoalPageUiService } from '../../service/goal-page-ui.service';
import { GoalsPageService } from '../../service/goal.service';
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
  private service = inject(GoalsPageService);
  private serviceUi = inject(GoalPageUiService);
  readonly loading = this.store.loadingList;
  goals = this.store.goals;
  selectedGoal = this.store.selectedGoal;
  isCreateModalOpen = signal(false);

  isSidebarOpen = this.serviceUi.isSidebarOpen;

  toggleSidebar(value: boolean) {
    this.serviceUi.setIsSidebarOpen(value);
  }
  readonly viewState = computed(() => {
    const loading = this.loading();

    if (loading) return 'loading';
    if (!this.goals && !loading) return 'empty';
    return 'ready';
  });

  selectGoal(id: string) {
    this.service.loadGoalDetails(id);
    this.toggleSidebar(false);
  }

  openModal() {
    this.isCreateModalOpen.set(true);
  }

  closeModal() {
    this.isCreateModalOpen.set(false);
  }
}
