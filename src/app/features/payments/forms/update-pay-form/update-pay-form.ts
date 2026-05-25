import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  output,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { TuiDay } from '@taiga-ui/cdk';
import { TuiButton, TuiLabel, TuiTextfield, tuiItemsHandlersProvider } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiInputDate, TuiSelect } from '@taiga-ui/kit';

import {
  SheduledPayment,
  UpdateScheduledPaymentRequest,
} from '@/app/models/scheduled-payment/scheduled-payment.model';
import { BillingCycle } from '@/app/models/types/billing-cycle.type';
import { CategoryType } from '@/app/models/types/category.type';

import { CATEGORY_OPTIONS } from '@/app/shared/constants/categories-option';
import { BILLING_CYCLE_OPTIONS } from '@/app/shared/constants/billing-cycle';
import { getBillingIntervalLabel } from '@/app/shared/utils/billing-label.util';

@Component({
  selector: 'app-update-payment-form',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiInputDate,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
    TuiLabel,
  ],
  templateUrl: './update-pay-form.html',
  styleUrl: './update-pay-form.scss',
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
export class UpdatePayForm implements OnInit {
  private fb = inject(FormBuilder);

  @Input({ required: true }) payment!: SheduledPayment;

  close = output<void>();
  update = output<UpdateScheduledPaymentRequest>();

  readonly categories = CATEGORY_OPTIONS;
  readonly billingCycles = BILLING_CYCLE_OPTIONS;

  readonly labelInterval = signal<string | null>(null);

  form = this.fb.group({
    title: ['', [Validators.required, this.notEmptyStringValidator()]],
    description: ['', [Validators.required, this.notEmptyStringValidator()]],
    amount: [null as number | null, [Validators.required, Validators.min(1)]],

    categoryName: [
      { value: null as { value: CategoryType; label: string } | null, disabled: false },
      Validators.required,
    ],

    billingCycle: [
      { value: null as { value: BillingCycle; label: string } | null, disabled: false },
      Validators.required,
    ],

    billingInterval: [null as number | null, [Validators.required, Validators.min(1)]],
    nextBillingDate: [null as TuiDay | null, [Validators.required, this.minDateValidator()]],
    endDate: [null as TuiDay | null, [Validators.required, this.minDateValidator()]],
  });

  constructor() {
    this.form.valueChanges.subscribe(() => {
      const { billingCycle, billingInterval } = this.form.getRawValue();

      if (!billingCycle || !billingInterval) {
        this.labelInterval.set(null);
        return;
      }

      this.labelInterval.set(getBillingIntervalLabel(billingCycle.value, billingInterval));
    });
  }

  ngOnInit() {
    this.form.patchValue({
      title: this.payment.title,
      description: this.payment.description ?? '',
      amount: this.payment.amount,

      categoryName:
        this.categories.find((category) => category.value === this.payment.categoryName) ?? null,

      billingCycle:
        this.billingCycles.find((cycle) => cycle.value === this.payment.billingCycle) ?? null,

      billingInterval: this.payment.billingInterval,
      nextBillingDate: this.toTuiDay(this.payment.nextBillingDate),
      endDate: this.payment.endDate ? this.toTuiDay(this.payment.endDate) : null,
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const request: UpdateScheduledPaymentRequest = {
      title: raw.title!,
      description: raw.description!,
      amount: Number(raw.amount),

      categoryName: raw.categoryName!.value,
      billingCycle: raw.billingCycle!.value,
      billingInterval: raw.billingInterval!,

      nextBillingDate: raw.nextBillingDate!.toLocalNativeDate().toISOString(),
      endDate: raw.endDate!.toLocalNativeDate().toISOString(),
    };

    this.update.emit(request);
  }

  private toTuiDay(date: string): TuiDay {
    const nativeDate = new Date(date);

    return new TuiDay(nativeDate.getFullYear(), nativeDate.getMonth(), nativeDate.getDate());
  }

  private notEmptyStringValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isNotEmpty = control.value && control.value.trim().length > 0;
      return isNotEmpty ? null : { emptyString: true };
    };
  }

  private minDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const today = TuiDay.currentLocal();

      return control.value.dayBefore(today) ? { minDate: true } : null;
    };
  }
}
