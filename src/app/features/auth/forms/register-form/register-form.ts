import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiTextfield, TuiTextfieldComponent, TuiIcon } from '@taiga-ui/core';
import { TuiPassword, TuiTooltip, TuiInputPhone } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../store/auth.store';
import { AuthPageService } from '../../services/auth.service';
import { normalizePhone, phoneValidator } from '@/app/shared/helpers/phone.validator';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiTextfieldComponent,
    RouterLink,
    TuiIcon,
    TuiPassword,
    TuiTooltip,
    TuiInputPhone,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthPageService);
  readonly authStore = inject(AuthStore);

  readonly form = this.fb.group({
    phone: ['', Validators.required, phoneValidator],

    bankPassword: ['', Validators.required],

    newPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.register(
      {
        phone: normalizePhone(this.form.value.phone!),

        bankPassword: this.form.value.bankPassword!,

        newPassword: this.form.value.newPassword!,
      },
      (fieldErrors) => {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          this.form.get(field)?.setErrors({
            backend: message,
          });
        });
      },
    );
  }
}
