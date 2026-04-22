import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { GoalsPageStore } from '../../services/goal-page.store';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiTextfield, TuiButton } from '@taiga-ui/core';
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

  @Output() close = new EventEmitter<void>();

  placeholderName = 'Прошлое название: ' + (this.store.selectedGoal()?.name ?? '');
  placeholderData = 'Прошлая дата окончания: ' + (dayjs(this.store.selectedGoal()?.deadline).format('YYYY-MM-DD') ?? '');

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
    if (!currentGoal || !currentGoal.id) {
      return;
    }

    const raw = this.form.getRawValue();
    const newName = raw.name && raw.name.trim().length > 0 ? raw.name : currentGoal.name;
    let newDeadlineIso: string;
    if (raw.deadline) {
      newDeadlineIso = raw.deadline.toLocalNativeDate().toISOString();
    } else {
      newDeadlineIso = currentGoal.deadline;
    }

    const request: UpdateGoalRequest = {
      id: currentGoal.id,
      name: newName,
      deadline: newDeadlineIso,
    };

    this.store.updateGoal(currentGoal.id, request);
    this.close.emit();
  }

  private notEmptyStringValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const isNotEmpty = control.value.trim().length > 0;
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

  private atLeastOneValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const nameControl = group.get('name');
      const deadlineControl = group.get('deadline');

      if (!nameControl || !deadlineControl) {
        return null;
      }

      const nameValue = nameControl.value;
      const deadlineValue = deadlineControl.value;

      const isNameEmpty =
        !nameValue || (typeof nameValue === 'string' && nameValue.trim().length === 0);

      if (isNameEmpty && !deadlineValue) {
        return { atLeastOneRequired: true };
      }
      return null;
    };
  }
}
