import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@/app/services/auth/auth.service';

import {
  LoginRequest,
  RegisterRequest,
  PasswordResetVerificationRequest,
  PasswordResetConfirmRequest,
} from '@/app/models/auth/auth.model';

import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthPageService {
  private readonly authService = inject(AuthService);

  private readonly authStore = inject(AuthStore);

  private readonly router = inject(Router);

  login(request: LoginRequest, setFieldErrors?: (errors: Record<string, string>) => void) {
    this.authStore.setLoading(true);

    this.authStore.setError(null);

    this.authService.login(request).subscribe({
      next: () => {
        this.authStore.setLoading(false);

        this.router.navigate(['/profile']);
      },

      error: (error) => {
        this.handleError(error, setFieldErrors);

        this.authStore.setLoading(false);
      },
    });
  }

  register(request: RegisterRequest, setFieldErrors?: (errors: Record<string, string>) => void) {
    this.authStore.setLoading(true);

    this.authStore.setError(null);

    this.authService.register(request).subscribe({
      next: () => {
        this.authStore.setLoading(false);

        this.router.navigate(['/profile']);
      },

      error: (error) => {
        this.handleError(error, setFieldErrors);

        this.authStore.setLoading(false);
      },
    });
  }

  sendResetPasswordCode(
    request: PasswordResetVerificationRequest,
    setFieldErrors?: (errors: Record<string, string>) => void,
    onSuccess?: () => void,
  ) {
    this.authStore.setLoading(true);

    this.authStore.setError(null);

    this.authService.sendPasswordResetCode(request).subscribe({
      next: () => {
        this.authStore.setLoading(false);

        this.authStore.setResetPasswordStep('confirm');

        onSuccess?.();
      },

      error: (error) => {
        this.handleError(error, setFieldErrors);

        this.authStore.setLoading(false);
      },
    });
  }

  confirmResetPassword(
    request: PasswordResetConfirmRequest,
    setFieldErrors?: (errors: Record<string, string>) => void,
  ) {
    this.authStore.setLoading(true);

    this.authStore.setError(null);

    this.authService.confirmPasswordReset(request).subscribe({
      next: () => {
        this.authStore.setLoading(false);

        this.router.navigate(['/profile']);
      },

      error: (error) => {
        this.handleError(error, setFieldErrors);

        this.authStore.setLoading(false);
      },
    });
  }

  private handleError(error: any, setFieldErrors?: (errors: Record<string, string>) => void) {
    const message = error?.error?.message || 'Something went wrong';

    const fieldErrors = error?.error?.errors;

    if (fieldErrors && setFieldErrors) {
      setFieldErrors(fieldErrors);
    } else {
      this.authStore.setError(message);
    }
  }
}
