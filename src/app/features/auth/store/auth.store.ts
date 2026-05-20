import { computed, Injectable, signal } from '@angular/core';

export type AuthMode = 'login' | 'register' | 'reset-password';

export type ResetPasswordStep = 'email' | 'confirm';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  readonly mode = signal<AuthMode>('login');
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly resetPasswordStep = signal<ResetPasswordStep>('email');
  readonly isLogin = computed(() => this.mode() === 'login');
  readonly isRegister = computed(() => this.mode() === 'register');
  readonly isResetPassword = computed(() => this.mode() === 'reset-password');
  readonly isEmailStep = computed(() => this.resetPasswordStep() === 'email');
  readonly isConfirmStep = computed(() => this.resetPasswordStep() === 'confirm');

  setMode(mode: AuthMode) {
    this.mode.set(mode);

    this.error.set(null);

    if (mode !== 'reset-password') {
      this.resetPasswordStep.set('email');
    }
  }

  setResetPasswordStep(step: ResetPasswordStep) {
    this.resetPasswordStep.set(step);
  }

  setLoading(value: boolean) {
    this.isLoading.set(value);
  }

  setError(error: string | null) {
    this.error.set(error);
  }

  reset() {
    this.isLoading.set(false);

    this.error.set(null);

    this.resetPasswordStep.set('email');
  }
}
