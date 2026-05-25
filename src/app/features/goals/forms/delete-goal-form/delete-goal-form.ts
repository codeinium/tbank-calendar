import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { GoalsPageStore } from '../../store/goal-page.store';
import { GoalsPageService } from '../../service/goal.service';

@Component({
  selector: 'app-delete-goal-form',
  imports: [TuiButton],
  templateUrl: './delete-goal-form.html',
  styleUrl: './delete-goal-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteGoalForm {
  private readonly store = inject(GoalsPageStore);
  private readonly goalsPageService = inject(GoalsPageService);

  close = output<void>();

  readonly goal = this.store.selectedGoal;
  readonly formLoading = this.store.formLoading;
  readonly formError = this.store.formError;

  submit() {
    const goal = this.goal();

    if (!goal?.id) return;

    this.goalsPageService.cancelGoal(goal.id, () => {
      this.close.emit();
    });
  }
}
