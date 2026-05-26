import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { TuiButton, tuiItemsHandlersProvider, TuiTextfield, TuiLabel } from '@taiga-ui/core';
import { BillingCycle } from '@/app/models/types/billing-cycle.type';
import { TuiInputDate, TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { TuiDay } from '@taiga-ui/cdk';
import { CategoryType } from '@/app/models/types/category.type';
import { CATEGORY_OPTIONS } from '@/app/shared/constants/categories-option';
import { BILLING_CYCLE_OPTIONS } from '@/app/shared/constants/billing-cycle';
import { CreateScheduledPaymentRequest } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { ScheduledPaymentService } from '../../services/scheduled-payment.service';
import { getBillingIntervalLabel } from '@/app/shared/utils/billing-label.util';
import { CategoriesStore, CategoryOption } from '@/app/services/category/category.store';

@Component({
  selector: 'app-create-scheduled-payment-form',
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
  templateUrl: './create-scheduled-payment-form.html',
  styleUrl: './create-scheduled-payment-form.scss',
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
export class CreateScheduledPaymentForm {
  private fb = inject(FormBuilder);
  private service = inject(ScheduledPaymentService);
  private readonly categoriesStore = inject(CategoriesStore);
  
  close = output<void>();

  readonly categories = this.categoriesStore.categoryOptions;
  readonly categoriesLoading = this.categoriesStore.loading;
  readonly billingCycles = BILLING_CYCLE_OPTIONS;

  readonly labelInterval = signal<string | null>(null);

  form = this.fb.group({
    title: ['', [Validators.required, this.notEmptyStringValidator()]],
    description: ['', [Validators.required, this.notEmptyStringValidator()]],
    amount: [null as number | null, [Validators.required, Validators.min(1)]],
    categoryName: [{ value: null as CategoryOption | null, disabled: false }, Validators.required],

    billingCycle: [
      { value: null as { value: BillingCycle; label: string } | null, disabled: false },
      Validators.required,
    ],
    billingInterval: [null as number | null, [Validators.required, Validators.min(1)]],
    endDate: [null as TuiDay | null, [Validators.required, this.minDateValidator()]],
    nextBillingDate: [null as TuiDay | null, [Validators.required, this.minDateValidator()]],
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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const request: CreateScheduledPaymentRequest = {
      title: raw.title!,
      description: raw.description!,
      amount: Number(raw.amount),

      categoryName: raw.categoryName!.value,
      billingCycle: raw.billingCycle!.value,
      nextBillingDate: raw.nextBillingDate!.toLocalNativeDate().toISOString(),
      billingInterval: raw.billingInterval!,
      endDate: raw.endDate!.toLocalNativeDate().toISOString(),
    };
    this.service.create(request);
    this.close.emit();
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
