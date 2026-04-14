import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { GoalsPageStore } from '@/app/features/goals/services/goal.service';
import { TuiButton, TuiIcon, tuiItemsHandlersProvider, TuiTextfield, } from '@taiga-ui/core';
import { BillingCycle, CreateGoalRequest } from '@/app/models/goal/model/goal.model';
import { TuiInputDate, TuiCheckbox, TuiChevron, TuiDataListWrapper, TuiSelect} from '@taiga-ui/kit';
import { trigger, transition, style, animate } from '@angular/animations';


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

  readonly billingCycles: { value: BillingCycle; label: string }[] = [
    { value: 'daily', label: 'Ежедневно' },
    { value: 'weekly', label: 'Еженедельно' },
    { value: 'monthly', label: 'Ежемесячно' },
    { value: 'yearly', label: 'Ежегодно' },
  ];

  @Output() close = new EventEmitter<void>();

  form = this.fb.group({
    name: ['', [Validators.required]],
    targetAmount: [0, [Validators.required, Validators.min(0)]],
    deadline: [null as string | Date | null, [Validators.required, this.minDateValidator()]],
    hardMode: [false],
    autoPay: [false],

    accountId: [{ value: null as string | null, disabled: true }, Validators.required],
    billingCycle: [{ value: null as BillingCycle | null, disabled: true }, Validators.required],
    billingInterval: [
      { value: null as number | null, disabled: true },
      [Validators.required, Validators.min(1)],
    ],
    autoPayAmount: [
      { value: null as number | null, disabled: true },
      [Validators.required, Validators.min(0.01)],
    ],
  });

  constructor() {
    this.form.get('autoPay')?.valueChanges.subscribe((enabled) => {
      const fields = ['accountId', 'billingCycle', 'billingInterval', 'autoPayAmount'];
      fields.forEach((key) => {
        const control = this.form.get(key);
        if (enabled) {
          control?.enable();
        } else {
          control?.setValue(null, { emitEvent: false });
          control?.disable();
        }
      });
    });
  }

  private minDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const val = control.value;
      const controlDate = val.toLocalNativeDate ? val.toLocalNativeDate() : new Date(val);
      controlDate.setHours(0, 0, 0, 0);

      return controlDate < today ? { minDate: true } : null;
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
      deadline: raw.deadline?.toString()!,
      hardMode: raw.hardMode ?? false,
      autoPay: raw.autoPay ?? false,

      accountId: raw.autoPay ? (raw.accountId ?? undefined) : undefined,
      billingCycle: raw.autoPay ? (raw.billingCycle ?? undefined) : undefined,
      billingInterval: raw.autoPay ? (raw.billingInterval ?? undefined) : undefined,
      autoPayAmount: raw.autoPay ? (raw.autoPayAmount ?? undefined) : undefined,
    };

    this.store.createGoal(request);
    this.close.emit();
  }

  stringifyBillingCycle = (item: { value: BillingCycle; label: string }) => item.label;
}
