import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoalsPageStore } from '../../services/goal-page.store';
import { BillingCycle } from '@/app/models/types/billing-cycle.type';
import { UpdateGoalAutoPayRequest } from '@/app/models/goal/goal.model';

import { TuiButton, tuiItemsHandlersProvider, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect, TuiSwitch } from '@taiga-ui/kit';
import { BILLING_CYCLE_OPTIONS } from '@/app/shared/constants/billing-cycle';
import { getBillingIntervalLabel } from '@/app/shared/utils/billing-label.util';

@Component({
  selector: 'app-update-auto-pay-form',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
    TuiSwitch,
  ],
  templateUrl: './update-auto-pay-form.html',
  styleUrl: './update-auto-pay-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: signal((item: { value: string; label: string }) => item.label),
      identityMatcher: signal(
        (a: { value: string; label: string }, b: { value: string; label: string }) =>
          a.value === b.value,
      ),
    }),
  ],
})
export class UpdateAutoPayForm {
  private fb = inject(FormBuilder);
  private store = inject(GoalsPageStore);

  close = output<void>();

  readonly billingCycles = BILLING_CYCLE_OPTIONS;
  readonly accounts = this.store.accounts;

  readonly labelInterval = signal<string | null>(null);

  form = this.fb.group({
    isActive: [false],

    autoPayAccountId: [{ value: null as string | null, disabled: true }, Validators.required],
    billingCycle: [
      { value: null as { value: BillingCycle; label: string } | null, disabled: true },
      Validators.required,
    ],
    billingInterval: [
      { value: null as number | null, disabled: true },
      [Validators.required, Validators.min(1)],
    ],
    amount: [
      { value: null as number | null, disabled: true },
      [Validators.required, Validators.min(1)],
    ],
  });

  constructor() {
    const goal = this.store.selectedGoal();

    if (goal) {
      const isActive = !!goal.autoPay;
      const selectedCycle = this.billingCycles.find((cycle) => cycle.value === goal.billingCycle);

      this.form.patchValue(
        {
          isActive,
          autoPayAccountId: goal.autoPayAccountId ?? null,
          billingCycle: selectedCycle ?? null,
          billingInterval: goal.billingInterval ?? null,
          amount: goal.autoPayAmount ?? null,
        },
        { emitEvent: false },
      );

      if (isActive) {
        this.enableFields();
      }
    }

    this.form.get('isActive')?.valueChanges.subscribe((enabled) => {
      enabled ? this.enableFields() : this.disableFields();
    });

    this.form.valueChanges.subscribe(() => {
      const { billingCycle, billingInterval } = this.form.getRawValue();

      if (!billingCycle || !billingInterval) {
        this.labelInterval.set(null);
        return;
      }

      this.labelInterval.set(getBillingIntervalLabel(billingCycle.value, billingInterval));
    });
  }

  private enableFields() {
    ['autoPayAccountId', 'billingCycle', 'billingInterval', 'amount'].forEach((key) =>
      this.form.get(key)?.enable({ emitEvent: false }),
    );
  }

  private disableFields() {
    ['autoPayAccountId', 'billingCycle', 'billingInterval', 'amount'].forEach((key) => {
      this.form.get(key)?.reset(null, { emitEvent: false });
      this.form.get(key)?.disable({ emitEvent: false });
    });

    this.labelInterval.set(null);
  }

  submit() {
    const currentGoal = this.store.selectedGoal();
    if (!currentGoal?.id) return;

    const raw = this.form.getRawValue();

    let request: UpdateGoalAutoPayRequest;

    if (!raw.isActive) {
      request = {
        isActive: false,
      };
    } else {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      request = {
        isActive: true,
        autoPayAccountId: raw.autoPayAccountId!,
        billingCycle: raw.billingCycle!.value,
        billingInterval: raw.billingInterval!,
        amount: raw.amount!,
      };
    }

    this.store.updateGoalAutoPay(currentGoal.id, request);
    this.close.emit();
  }

  stringifyBillingCycle = (item: { value: BillingCycle; label: string }) => item.label;
}
