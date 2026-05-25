import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';

import { GoalsPageStore } from '../../store/goal-page.store';
import { GoalsPageService } from '../../service/goal.service';
import { GoalWithdrawRequest } from '@/app/models/goal/goal.model';

@Component({
  selector: 'app-withdraw-goal-form',
  imports: [ReactiveFormsModule, TuiButton, TuiTextfield],
  templateUrl: './withdraw-goal-form.html',
  styleUrl: './withdraw-goal-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawGoalForm {
  private fb = inject(FormBuilder);
  private store = inject(GoalsPageStore);
  private goalsPageService = inject(GoalsPageService);

  close = output<void>();

  readonly formError = this.store.formError;
  readonly formLoading = this.store.formLoading;

  form = this.fb.group({
    amount: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const goal = this.store.selectedGoal();
    if (!goal?.id) return;

    const raw = this.form.getRawValue();

    const request: GoalWithdrawRequest = {
      amount: raw.amount!,
    };

    this.goalsPageService.withdraw(
      goal.id,
      request,
      (fieldErrors) => this.setBackendErrors(fieldErrors),
      () => this.close.emit(),
    );
  }

  private setBackendErrors(errors: Record<string, string>) {
    Object.entries(errors).forEach(([field, message]) => {
      const controlName = this.mapBackendField(field);

      this.form.get(controlName)?.setErrors({
        backend: message,
      });
    });
  }

  private mapBackendField(field: string): string {
    const map: Record<string, string> = {
      amount: 'amount',
    };

    return map[field] ?? field;
  }
}
