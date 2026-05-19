import { Injectable, inject } from '@angular/core';
import { forkJoin, of, switchMap } from 'rxjs';

import { UserService } from '@/app/services/user/user.service';
import { ProfileStore } from '../store/profile.store';

import {
  ChangePasswordRequest,
  EmailConfirmRequest,
  EmailVerificationRequest,
  UpdateNameRequest,
} from '@/app/models/user/user.model';
import { SwitchAccountRequest } from '@/app/models/auth/auth.model';
import { AuthService } from '@/app/services/auth/auth.service';
import { SettingsStore } from '../store/settings.store';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProfilePageService {
  private router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly profileStore = inject(ProfileStore);
  private readonly settingsStore = inject(SettingsStore);

  loadProfileData(force = false) {
    if ((!force && this.profileStore.isInitialized()) || this.profileStore.loading()) {
      return;
    }

    this.profileStore.setLoading(true);
    this.profileStore.setError(null);

    forkJoin({
      user: this.userService.getMe(),
      accounts: this.userService.getMyAccounts(),
    }).subscribe({
      next: ({ user, accounts }) => {
        this.profileStore.setUser(user);
        this.profileStore.setAccounts(accounts);
        const activeAccount = accounts.find((acc) => acc.accountId === user.accountId) ?? null;
        this.profileStore.setActiveAccount(activeAccount);
        this.profileStore.isInitialized.set(true);
        this.profileStore.setLoading(false);
      },
      error: () => {
        this.profileStore.setError('Failed to load profile');
        this.profileStore.setLoading(false);
      },
    });
  }

  updateName(
    request: UpdateNameRequest,
    setFieldErrors?: (errors: Record<string, string>) => void,
  ) {
    this.settingsStore.startLoading('update-name');
    this.settingsStore.setError(null);

    this.userService.updateName(request).subscribe({
      next: (user) => {
        this.profileStore.setUser(user);
        this.settingsStore.stopLoading();
        this.settingsStore.closeForm();
      },
      error: (error) => {
        const message = error?.error?.message || 'Failed to update name';

        const fieldErrors = error?.error?.errors;

        if (fieldErrors && setFieldErrors) {
          setFieldErrors(fieldErrors);
        } else {
          this.settingsStore.setError(message);
        }
        this.settingsStore.stopLoading();
      },
    });
  }

  sendEmailVerification(
    request: EmailVerificationRequest,
    setFieldErrors?: (errors: Record<string, string>) => void,
    onSuccess?: () => void,
  ) {
    this.settingsStore.startLoading('send-email-code');

    this.userService.sendEmailVerificationCode(request).subscribe({
      next: () => {
        onSuccess?.();
        this.settingsStore.stopLoading();
      },

      error: (error) => {
        const message = error?.error?.message || 'Failed to send email verification code';

        const fieldErrors = error?.error?.errors;

        if (fieldErrors && setFieldErrors) {
          setFieldErrors(fieldErrors);
        } else {
          this.settingsStore.setError(message);
        }

        this.settingsStore.stopLoading();
      },
    });
  }

  confirmEmail(
    request: EmailConfirmRequest,
    setFieldErrors?: (errors: Record<string, string>) => void,
  ) {
    this.settingsStore.startLoading('confirm-email');

    this.userService.confirmEmail(request).subscribe({
      next: (user) => {
        this.profileStore.setUser(user);
        this.settingsStore.stopLoading();
        this.settingsStore.closeForm();
      },

      error: (error) => {
        const message = error?.error?.message || 'Failed to confirm email';

        const fieldErrors = error?.error?.errors;
        if (fieldErrors && setFieldErrors) {
          setFieldErrors(fieldErrors);
        } else {
          this.settingsStore.setError(message);
        }

        this.settingsStore.stopLoading();
      },
    });
  }

  deleteEmail() {
    this.userService.deleteEmail().subscribe({
      next: () => {
        const currentUser = this.profileStore.user();

        if (currentUser) {
          this.profileStore.setUser({
            ...currentUser,
            email: null,
          });
        }
        this.settingsStore.closeForm();
      },
      error: () => {
        this.settingsStore.setError('Failed to delete email');
      },
    });
  }

  changePassword(
    request: ChangePasswordRequest,
    setFieldErrors?: (errors: Record<string, string>) => void,
  ) {
    this.settingsStore.startLoading('change-password');
    this.settingsStore.setError(null);

    this.userService.changePassword(request).subscribe({
      next: () => {
        this.settingsStore.stopLoading();
        this.settingsStore.closeForm();
      },
      error: (error) => {
        const message = error?.error?.message || 'Failed to change password';
        const fieldErrors = error?.error?.errors;

        if (fieldErrors && setFieldErrors) {
          setFieldErrors(fieldErrors);
        } else {
          this.settingsStore.setError(message);
        }
        this.settingsStore.stopLoading();
      },
    });
  }

  switchAccount(
    request: SwitchAccountRequest,
    setFieldErrors?: (errors: Record<string, string>) => void,
  ) {
    this.settingsStore.startLoading('switch-account');
    this.settingsStore.setError(null);

    this.authService.switchAccount(request).subscribe({
      next: () => {
        this.loadProfileData(true);

        queueMicrotask(() => {
          this.settingsStore.closeForm();
        });
      },
      error: (error) => {
        const message = error?.error?.message || 'Failed to switch account';
        const fieldErrors = error?.error?.errors;

        if (fieldErrors && setFieldErrors) {
          setFieldErrors(fieldErrors);
        } else {
          this.settingsStore.setError(message);
        }
        this.settingsStore.stopLoading();
      },
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.profileStore.reset();
      this.router.navigate(['/login']);
    });
  }
}
