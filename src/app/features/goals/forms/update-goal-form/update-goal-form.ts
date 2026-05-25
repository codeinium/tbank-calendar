import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { GoalsPageStore } from '../../store/goal-page.store';
import { GoalsPageService } from '../../service/goal.service';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { UpdateGoalRequest } from '@/app/models/goal/goal.model';
import { TuiInputDate } from '@taiga-ui/kit';

@Component({
  selector: 'app-update-goal-form',
  imports: [ReactiveFormsModule, TuiButton, TuiTextfield, TuiInputDate],
  templateUrl: './update-goal-form.html',
  styleUrl: './update-goal-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateGoalForm {
  private fb = inject(FormBuilder);
  private store = inject(GoalsPageStore);
  private goalsPageService = inject(GoalsPageService);

  close = output<void>();

  readonly formLoading = this.store.formLoading;
  readonly formError = this.store.formError;

  placeholderName = 'Прошлое название: ' + (this.store.selectedGoal()?.name ?? '');
  placeholderData =
    'Прошлая дата окончания: ' + dayjs(this.store.selectedGoal()?.deadline).format('YYYY-MM-DD');

  form = this.fb.group(
    {
      name: ['', [this.notEmptyStringValidator()]],
      deadline: [null as TuiDay | null, [this.minDateValidator()]],
    },
    {
      validators: [this.atLeastOneValidator()],
    },
  );

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const currentGoal = this.store.selectedGoal();
    if (!currentGoal?.id) return;

    const raw = this.form.getRawValue();

    const request: UpdateGoalRequest = {
      name: raw.name?.trim() || currentGoal.name,
      deadline: raw.deadline
        ? raw.deadline.toLocalNativeDate().toISOString()
        : currentGoal.deadline,
    };
    this.goalsPageService.updateGoal(
      currentGoal.id,
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

  private mapBackendField(field: string): string {
    const map: Record<string, string> = {
      deadline: 'deadline',
      name: 'name',
    };

    return map[field] ?? field;
  }

  private notEmptyStringValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      return control.value.trim().length > 0 ? null : { emptyString: true };
    };
  }

  private minDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const today = TuiDay.currentLocal();

      return control.value.dayBefore(today) ? { minDate: true } : null;
    };
  }

  private atLeastOneValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const nameValue = group.get('name')?.value;
      const deadlineValue = group.get('deadline')?.value;

      const isNameEmpty =
        !nameValue || (typeof nameValue === 'string' && nameValue.trim().length === 0);

      return isNameEmpty && !deadlineValue ? { atLeastOneRequired: true } : null;
    };
  }
}