import { Injectable, inject } from '@angular/core';
import { forkJoin } from 'rxjs';

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

@Injectable()
export class ProfilePageService {
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly store = inject(ProfileStore);

  loadProfileData() {
    this.store.setLoading(true);
    this.store.setError(null);

    forkJoin({
      user: this.userService.getMe(),
      accounts: this.userService.getMyAccounts(),
    }).subscribe({
      next: ({ user, accounts }) => {
        this.store.setUser(user);
        this.store.setAccounts(accounts);

        const activeAccount = accounts.find((account) => account.status === 'ACTIVE') ?? null;

        this.store.setActiveAccount(activeAccount);

        this.store.setLoading(false);
      },
      error: () => {
        this.store.setError('Failed to load profile');
        this.store.setLoading(false);
      },
    });
  }

  updateName(request: UpdateNameRequest) {
    this.store.setNameUpdating(true);

    this.userService.updateName(request).subscribe({
      next: (user) => {
        this.store.setUser(user);
        this.store.setNameUpdating(false);
      },
      error: () => {
        this.store.setError('Failed to update name');
        this.store.setNameUpdating(false);
      },
    });
  }

  sendEmailVerification(request: EmailVerificationRequest) {
    this.store.setEmailUpdating(true);

    this.userService.sendEmailVerificationCode(request).subscribe({
      next: () => {
        this.store.setEmailUpdating(false);
      },
      error: () => {
        this.store.setError('Failed to send verification code');
        this.store.setEmailUpdating(false);
      },
    });
  }

  confirmEmail(request: EmailConfirmRequest) {
    this.store.setEmailUpdating(true);

    this.userService.confirmEmail(request).subscribe({
      next: (user) => {
        this.store.setUser(user);
        this.store.setEmailUpdating(false);
      },
      error: () => {
        this.store.setError('Failed to confirm email');
        this.store.setEmailUpdating(false);
      },
    });
  }

  deleteEmail() {
    this.store.setEmailUpdating(true);

    this.userService.deleteEmail().subscribe({
      next: () => {
        const currentUser = this.store.user();

        if (currentUser) {
          this.store.setUser({
            ...currentUser,
            email: null,
          });
        }

        this.store.setEmailUpdating(false);
      },
      error: () => {
        this.store.setError('Failed to delete email');
        this.store.setEmailUpdating(false);
      },
    });
  }

  changePassword(request: ChangePasswordRequest) {
    this.store.setPasswordChanging(true);

    this.userService.changePassword(request).subscribe({
      next: () => {
        this.store.setPasswordChanging(false);
      },
      error: () => {
        this.store.setError('Failed to change password');
        this.store.setPasswordChanging(false);
      },
    });
  }

  switchAccount(request: SwitchAccountRequest) {
    this.store.setAccountSwitching(true);
    this.store.setError(null);

    this.authService.switchAccount(request).subscribe({
      next: () => {
        this.loadProfileData();
        this.store.setAccountSwitching(false);
      },
      error: () => {
        this.store.setError('Failed to switch account');
        this.store.setAccountSwitching(false);
      },
    });
  }
}
