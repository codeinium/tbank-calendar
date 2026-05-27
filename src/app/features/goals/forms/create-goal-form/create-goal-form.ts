import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { GoalsPageStore } from '../../store/goal-page.store';
import { GoalsPageService } from '../../service/goal.service';
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
import { Account } from '@/app/models/user/user.model';

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
  private goalsPageService = inject(GoalsPageService);

  close = output<void>();

  readonly monthlyPayment = signal<number | null>(null);
  readonly labelInterval = signal<string | null>(null);

  readonly billingCycles = BILLING_CYCLE_OPTIONS;
  readonly accounts = this.store.accounts;
  readonly formLoading = this.store.formLoading;
  readonly formError = this.store.formError;

  form = this.fb.group({
    refundAccountId: [null as string | null, Validators.required],

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
          control?.enable({ emitEvent: false });
        } else {
          control?.reset(null, { emitEvent: false });
          control?.disable({ emitEvent: false });
        }
      });

      this.labelInterval.set(null);
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

      this.monthlyPayment.set(Math.round(targetAmount / months));
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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const request: CreateGoalRequest = {
      refundAccountId: raw.refundAccountId!,
      name: raw.name!.trim(),
      targetAmount: raw.targetAmount!,
      deadline: raw.deadline!.toLocalNativeDate().toISOString(),
      hardMode: raw.hardMode ?? false,
      autoPay: raw.autoPay ?? false,

      autoPayAccountId: raw.autoPay ? raw.autoPayAccountId : null,
      billingCycle: raw.autoPay ? raw.billingCycle!.value : null,
      billingInterval: raw.autoPay ? raw.billingInterval : null,
      autoPayAmount: raw.autoPay ? raw.autoPayAmount : null,
    };

    this.goalsPageService.createGoal(
      request,
      (fieldErrors) => {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          this.form.get(this.mapBackendField(field))?.setErrors({
            backend: message,
          });
        });
      },
      () => this.close.emit(),
    );
  }

  stringifyAccount = (account: Account | null): string => {
    if (!account) return '';
    return account.accountNumber;
  };

  disabledItems = (account: Account) => account.status !== 'ACTIVE';

  private minDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const today = TuiDay.currentLocal();

      return control.value.dayBefore(today) ? { minDate: true } : null;
    };
  }

  private notEmptyStringValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) return null;

      return value.trim().length > 0 ? null : { emptyString: true };
    };
  }

  private mapBackendField(field: string): string {
    const map: Record<string, string> = {
      refund_account_id: 'refundAccountId',
      target_amount: 'targetAmount',
      hard_mode: 'hardMode',
      auto_pay: 'autoPay',
      auto_pay_account_id: 'autoPayAccountId',
      billing_cycle: 'billingCycle',
      billing_interval: 'billingInterval',
      auto_pay_amount: 'autoPayAmount',
      deadline: 'deadline',
      name: 'name',
    };

    return map[field] ?? field;
  }
}
