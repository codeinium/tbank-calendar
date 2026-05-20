import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield, TuiTextfieldComponent } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { AuthStore } from '../../store/auth.store';
import { AuthPageService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password-form',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiTextfieldComponent,
    TuiPassword,
    TuiIcon,
  ],
  templateUrl: './reset-password-form.html',
  styleUrl: './reset-password-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordForm {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthPageService);
  readonly authStore = inject(AuthStore);

  readonly submitted = signal(false);

  readonly emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  readonly confirmForm = this.fb.group({
    code: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  sendCode() {
    this.submitted.set(true);

    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.authService.sendResetPasswordCode({
      email: this.emailForm.value.email!,
    });
  }

  confirm() {
    this.submitted.set(true);

    if (this.confirmForm.invalid) {
      this.confirmForm.markAllAsTouched();
      return;
    }

    this.authService.confirmResetPassword({
      email: this.emailForm.value.email!,
      code: this.confirmForm.value.code!,
      newPassword: this.confirmForm.value.newPassword!,
    });
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

  showError(control: AbstractControl | null, type?: string): boolean {
    if (!control) return false;

    if (type) {
      return control.hasError(type) && (control.touched || this.submitted());
    }

    return control.invalid && (control.touched || this.submitted());
  }
}
