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
import {
  TuiInputDate,
  TuiCheckbox,
  TuiChevron,
  TuiDataListWrapper,
  TuiSelect,
  TuiSwitch,
} from '@taiga-ui/kit';
@Component({
  selector: 'app-update-auto-pay-form',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiInputDate,
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

    accountId: [{ value: null as string | null, disabled: true }, Validators.required],
    billingCycle: [{ value: null as BillingCycle | null, disabled: true }, Validators.required],
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

      this.form.patchValue({
        isActive,
        accountId: goal.accountId ?? null,
        billingCycle: goal.billingCycle ?? null,
        billingInterval: goal.billingInterval ?? null,
        amount: goal.autoPayAmount ?? null,
      });

      if (isActive) {
        ['accountId', 'billingCycle', 'billingInterval', 'amount'].forEach((key) => {
          this.form.get(key)?.enable();
        });
      }
    }

    // твоя существующая логика
    this.form.get('isActive')?.valueChanges.subscribe((enabled) => {
      const fields = ['accountId', 'billingCycle', 'billingInterval', 'amount'];

      fields.forEach((key) => {
        const control = this.form.get(key);

        if (enabled) {
          control?.enable();
        } else {
          control?.reset();
          control?.disable();
        }
      });
    });
  }

  submit() {
    const raw = this.form.getRawValue();
    const currentGoal = this.store.selectedGoal();
    if (!currentGoal || !currentGoal.id) {
      return;
    }
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
        accountId: raw.accountId!,
        billingCycle: raw.billingCycle!,
        billingInterval: raw.billingInterval!,
        amount: raw.amount!,
      };
    }

    this.store.updateGoalAutoPay(currentGoal.id, request);
    this.close.emit();
  }

  stringifyBillingCycle = (item: { value: BillingCycle; label: string }) => item.label;
}
