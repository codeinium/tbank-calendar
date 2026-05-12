import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { GoalsPageStore } from '@/app/features/goals/services/goal-page.store';
import {
  TuiButton,
  TuiIcon,
  tuiItemsHandlersProvider,
  TuiTextfield,
  TuiLabel,
} from '@taiga-ui/core';
import { BillingCycle } from '@/app/models/types/billing-cycle.type';
import { CreateGoalRequest } from '@/app/models/goal/goal.model';
import {
  TuiInputDate,
  TuiCheckbox,
  TuiChevron,
  TuiDataListWrapper,
  TuiSelect,
  TuiTooltip,
} from '@taiga-ui/kit';
import { trigger, transition, style, animate } from '@angular/animations';
import { TuiDay } from '@taiga-ui/cdk';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { BILLING_CYCLE_OPTIONS } from '@/app/shared/constants/billing-cycle';
import { getBillingIntervalLabel } from '@/app/shared/utils/billing-label.util';

@Component({
  selector: 'app-create-goal-form',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiInputDate,
    TuiCheckbox,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
    TuiLabel,
    TuiIcon,
    TuiTooltip,
  ],
  animations: [
    trigger('autoPaySlide', [
      transition(':enter', [
        style({ height: '0px', opacity: 0, overflow: 'hidden' }),
        animate(
          '300ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ height: '*', opacity: 1, overflow: 'visible' }),
        ),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'visible' }),
        animate(
          '300ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ height: '0px', opacity: 0, overflow: 'hidden' }),
        ),
      ]),
    ]),
  ],
  templateUrl: './create-goal-form.html',
  styleUrl: './create-goal-form.scss',
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
export class CreateGoalForm {
  private fb = inject(FormBuilder);
  private store = inject(GoalsPageStore);

  readonly monthlyPayment = signal<number | null>(null);

  readonly billingCycles = BILLING_CYCLE_OPTIONS;

  close = output<void>();

  readonly labelInterval = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required, this.notEmptyStringValidator()]],
    targetAmount: [null as number | null, [Validators.required, Validators.min(1)]],
    deadline: [null as TuiDay | null, [Validators.required, this.minDateValidator()]],
    hardMode: [false],
    autoPay: [false],

    autoPayAccountId: [{ value: null as string | null, disabled: true }, Validators.required],
    billingCycle: [
      { value: null as { value: BillingCycle; label: string } | null, disabled: true },
      Validators.required,
    ],
    billingInterval: [
      { value: null as number | null, disabled: true },
      [Validators.required, Validators.min(1)],
    ],
    autoPayAmount: [
      { value: null as number | null, disabled: true },
      [Validators.required, Validators.min(1)],
    ],
  });

  constructor() {
    this.form.get('autoPay')?.valueChanges.subscribe((enabled) => {
      const fields = ['autoPayAccountId', 'billingCycle', 'billingInterval', 'autoPayAmount'];
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
    this.form.valueChanges.subscribe(() => {
      const { targetAmount, deadline } = this.form.getRawValue();
      if (!targetAmount || !deadline) {
        this.monthlyPayment.set(null);
        return;
      }
      const today = dayjs().startOf('day');
      const endDate = dayjs(deadline.toLocalNativeDate());
      const months = (endDate.year() - today.year()) * 12 + (endDate.month() - today.month());
      if (months <= 0) {
        this.monthlyPayment.set(null);
        return;
      }
      const perMonth = targetAmount / months;
      this.monthlyPayment.set(Number(Math.round(perMonth)));
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

  private minDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const today = TuiDay.currentLocal();

      return control.value.dayBefore(today) ? { minDate: true } : null;
    };
  }

  private notEmptyStringValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isNotEmpty = control.value && control.value.trim().length > 0;
      return isNotEmpty ? null : { emptyString: true };
    };
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const request: CreateGoalRequest = {
      name: raw.name!,
      targetAmount: raw.targetAmount!,
      deadline: raw.deadline!.toLocalNativeDate().toISOString(),
      hardMode: raw.hardMode ?? false,
      autoPay: raw.autoPay ?? false,

      autoPayAccountId: raw.autoPay ? (raw.autoPayAccountId ?? undefined) : undefined,
      billingCycle: raw.autoPay ? raw.billingCycle?.value : undefined,
      billingInterval: raw.autoPay ? (raw.billingInterval ?? undefined) : undefined,
      autoPayAmount: raw.autoPay ? (raw.autoPayAmount ?? undefined) : undefined,
    };

    this.store.createGoal(request);
    this.close.emit();
  }
}
