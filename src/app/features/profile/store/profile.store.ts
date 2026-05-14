import { Injectable, signal, computed } from '@angular/core';
import { User, Account } from '@/app/models/user/user.model';

@Injectable()
export class ProfileStore {
  readonly user = signal<User | null>(null);
  readonly accounts = signal<Account[]>([]);
  readonly activeAccount = signal<Account | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly accountSwitching = signal(false);
  readonly emailUpdating = signal(false);
  readonly passwordChanging = signal(false);
  readonly nameUpdating = signal(false);

  readonly fullName = computed(() => {
    const currentUser = this.user();

    if (!currentUser) return '';

    return `${currentUser.firstName} ${currentUser.lastName}`;
  });

  readonly hasEmail = computed(() => {
    return !!this.user()?.email;
  });

  readonly totalBalance = computed(() => {
    return this.accounts().reduce((sum, account) => sum + account.balance, 0);
  });

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  setUser(user: User) {
    this.user.set(user);
  }

  setAccounts(accounts: Account[]) {
    this.accounts.set(accounts);
  }

  setAccountSwitching(value: boolean) {
    this.accountSwitching.set(value);
  }

  setActiveAccount(account: Account | null) {
    this.activeAccount.set(account);
  }

  setError(error: string | null) {
    this.error.set(error);
  }

  setEmailUpdating(value: boolean) {
    this.emailUpdating.set(value);
  }

  setPasswordChanging(value: boolean) {
    this.passwordChanging.set(value);
  }

  setNameUpdating(value: boolean) {
    this.nameUpdating.set(value);
  }

  clearState() {
    this.error.set(null);
  }
}
