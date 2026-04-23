import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GoalsPageStore } from '../../services/goal-page.store';
import { BillingCycle, UpdateGoalAutoPayRequest } from '@/app/models/goal/goal.model';

import { TuiButton, tuiItemsHandlersProvider, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect, TuiSwitch } from '@taiga-ui/kit';

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

  @Output() close = new EventEmitter<void>();

  readonly billingCycles: { value: BillingCycle; label: string }[] = [
    { value: 'daily', label: 'Ежедневно' },
    { value: 'weekly', label: 'Еженедельно' },
    { value: 'monthly', label: 'Ежемесячно' },
    { value: 'yearly', label: 'Ежегодно' },
  ];

  form = this.fb.group({
    isActive: [false],

    autoPayAccountId: [
      { value: null as string | null, disabled: true },
      Validators.required,
    ],
    billingCycle: [{ value: null as any, disabled: true }, Validators.required],
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

      const selectedCycle = this.billingCycles.find((c) => c.value === goal.billingCycle);
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
      if (enabled) {
        this.enableFields();
      } else {
        this.disableFields();
      }
    });
  }

  private enableFields() {
    const fields = ['autoPayAccountId', 'billingCycle', 'billingInterval', 'amount'];
    fields.forEach((key) => this.form.get(key)?.enable({ emitEvent: false }));
  }

  private disableFields() {
    const fields = ['autoPayAccountId', 'billingCycle', 'billingInterval', 'amount'];
    fields.forEach((key) => {
      this.form.get(key)?.reset();
      this.form.get(key)?.disable({ emitEvent: false });
    });
  }

  submit() {
    const raw = this.form.getRawValue();
    const currentGoal = this.store.selectedGoal();

    if (!currentGoal?.id) return;

    let request: UpdateGoalAutoPayRequest;

    if (!raw.isActive) {
      request = {
        id: currentGoal.id,
        isActive: false,
      };
    } else {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      request = {
        id: currentGoal.id,
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
