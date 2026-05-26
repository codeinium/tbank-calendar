import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiTextfield, TuiTextfieldComponent, TuiIcon } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../store/auth.store';
import { AuthPageService } from '../../services/auth.service';
import { TuiPassword, TuiInputPhone } from '@taiga-ui/kit';
import { normalizePhone, phoneValidator } from '@/app/shared/helpers/phone.validator';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiTextfieldComponent,
    RouterLink,
    TuiPassword,
    TuiIcon,
    TuiInputPhone,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthPageService);
  readonly authStore = inject(AuthStore);

  readonly form = this.fb.group({
    phone: ['', [Validators.required, phoneValidator]],
    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(
      {
        phone: normalizePhone(this.form.value.phone!),
        password: this.form.value.password!,
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
