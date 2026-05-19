import { Injectable, signal, computed } from '@angular/core';
import { User, Account } from '@/app/models/user/user.model';

@Injectable({ providedIn: 'root' })
export class ProfileStore {
  readonly user = signal<User | null>(null);
  readonly accounts = signal<Account[]>([]);
  readonly activeAccount = signal<Account | null>(null);
  readonly loading = signal(false);
  readonly profilePageError = signal<string | null>(null);
  readonly isInitialized = signal(false);

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

  setActiveAccount(account: Account | null) {
    this.activeAccount.set(account);
  }

  setError(error: string | null) {
    this.profilePageError.set(error);
  }

  clearState() {
    this.profilePageError.set(null);
  }

  reset() {
    this.user.set(null);
    this.accounts.set([]);
    this.activeAccount.set(null);
    this.isInitialized.set(false);
    this.profilePageError.set(null);
    this.loading.set(false);
  }
}
