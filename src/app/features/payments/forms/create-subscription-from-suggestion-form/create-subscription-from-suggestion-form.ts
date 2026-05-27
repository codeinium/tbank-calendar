import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  effect,
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
import { TuiButton, TuiLabel, TuiTextfield, tuiItemsHandlersProvider, TuiLoader } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiInputDate, TuiSelect } from '@taiga-ui/kit';

import { SubscriptionService } from '../../services/subscription.service';
import { CreateSubscriptionRequest } from '@/app/models/subscription/subscription.model';
import { BillingCycle } from '@/app/models/types/billing-cycle.type';
import { BILLING_CYCLE_OPTIONS } from '@/app/shared/constants/billing-cycle';
import { getBillingIntervalLabel } from '@/app/shared/utils/billing-label.util';
import { CategoriesStore, CategoryOption } from '@/app/services/category/category.store';
import { RecurringSuggestion } from '@/app/models/recurring-suggestion/recurring-suggestion.model';

@Component({
  selector: 'app-create-subscription-from-suggestion-form',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiInputDate,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
    TuiLabel,
    TuiLoader
],
  templateUrl: './create-subscription-from-suggestion-form.html',
  styleUrl: './create-subscription-from-suggestion-form.scss',
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
export class CreateSubscriptionFromSuggestionForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(SubscriptionService);
  private readonly categoriesStore = inject(CategoriesStore);

  @Input({ required: true }) suggestion!: RecurringSuggestion;

  readonly loading = this.service.loading;
  readonly close = output<void>();
  readonly created = output<void>();

  readonly categories = this.categoriesStore.categoryOptions;
  readonly billingCycles = BILLING_CYCLE_OPTIONS;

  readonly labelInterval = signal<string | null>(null);
  private readonly patched = signal(false);

  form = this.fb.group({
    title: ['', [Validators.required, this.notEmptyStringValidator()]],
    description: [''],

    amount: [null as number | null, [Validators.required, Validators.min(1)]],

    categoryName: [{ value: null as CategoryOption | null, disabled: false }, Validators.required],

    billingCycle: [
      { value: null as { value: BillingCycle; label: string } | null, disabled: false },
      Validators.required,
    ],

    billingInterval: [1 as number | null, [Validators.required, Validators.min(1)]],

    nextBillingDate: [null as TuiDay | null, [Validators.required, this.minDateValidator()]],

    endDate: [null as TuiDay | null, [this.minDateValidator()]],
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

    effect(() => {
      if (this.patched() || !this.suggestion || this.categories().length === 0) {
        return;
      }

      this.patchFromSuggestion();
      this.patched.set(true);
    });
  }

  ngOnInit() {
    if (!this.patched() && this.categories().length > 0) {
      this.patchFromSuggestion();
      this.patched.set(true);
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const request: CreateSubscriptionRequest = {
      title: raw.title!,
      description: raw.description?.trim() || null,
      amount: Number(raw.amount),
      categoryName: raw.categoryName!.value,
      billingCycle: raw.billingCycle!.value,
      billingInterval: raw.billingInterval!,
      nextBillingDate: raw.nextBillingDate!.toLocalNativeDate().toISOString(),
      endDate: raw.endDate ? raw.endDate.toLocalNativeDate().toISOString() : null,
    };

    this.service.create(request, () => {
      this.created.emit();
    });
  }

  private patchFromSuggestion() {
    this.form.patchValue({
      title: this.suggestion.counterpartyName,
      amount: this.suggestion.amount,
      description: '',

      categoryName:
        this.categories().find((category) => category.value === this.suggestion.category) ?? null,

      billingCycle:
        this.billingCycles.find((cycle) => cycle.value === this.suggestion.suggestedBillingCycle) ??
        null,

      billingInterval: 1,
      nextBillingDate: null,
      endDate: null,
    });
  }

  private notEmptyStringValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      return value && value.trim().length > 0 ? null : { emptyString: true };
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
