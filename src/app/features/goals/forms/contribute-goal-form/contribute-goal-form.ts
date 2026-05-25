import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';

import { GoalsPageStore } from '../../store/goal-page.store';
import { GoalsPageService } from '../../service/goal.service';
import { Account } from '@/app/models/user/user.model';
import { GoalContributeRequest } from '@/app/models/goal/goal.model';

@Component({
  selector: 'app-contribute-goal-form',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
  ],
  templateUrl: './contribute-goal-form.html',
  styleUrl: './contribute-goal-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContributeGoalForm {
  private fb = inject(FormBuilder);
  private store = inject(GoalsPageStore);
  private goalsPageService = inject(GoalsPageService);

  close = output<void>();

  readonly accounts = this.store.accounts;
  readonly formError = this.store.formError;
  readonly formLoading = this.store.formLoading;

  form = this.fb.group({
    account: [null as Account | null, Validators.required],
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

    const request: GoalContributeRequest = {
      accountId: raw.account!.accountId,
      amount: raw.amount!,
    };

    this.goalsPageService.contribute(
      goal.id,
      request,
      (fieldErrors) => this.setBackendErrors(fieldErrors),
      () => this.close.emit(),
    );
  }

  stringifyAccount = (account: Account) =>
    `${account.accountNumber} · ${account.balance.toLocaleString()} ₽`;

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
      from_account_id: 'account',
      account_id: 'account',
      amount: 'amount',
    };

    return map[field] ?? field;
  }

  disabledItems = (account: Account) => account.status !== 'ACTIVE';
}
