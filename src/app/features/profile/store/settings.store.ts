import { computed, Injectable, signal } from '@angular/core';

export type ActiveForm = 'name' | 'email' | 'password' | 'account' | null;

export type LoadingState =
  | 'update-name'
  | 'send-email-code'
  | 'confirm-email'
  | 'change-password'
  | 'switch-account'
  | null;

@Injectable({
  providedIn: 'root',
})
export class SettingsStore {
  readonly activeForm = signal<ActiveForm>(null);

  readonly loading = signal<LoadingState>(null);

  readonly settingsPageError = signal<string | null>(null);


  readonly isNameOpened = computed(() => this.activeForm() === 'name');
  readonly isEmailOpened = computed(() => this.activeForm() === 'email');
  readonly isPasswordOpened = computed(() => this.activeForm() === 'password');
  readonly isAccountOpened = computed(() => this.activeForm() === 'account');


  readonly isNameLoading = computed(() => this.loading() === 'update-name');
  readonly isSendEmailCodeLoading = computed(() => this.loading() === 'send-email-code');
  readonly isConfirmEmailLoading = computed(() => this.loading() === 'confirm-email');
  readonly isPasswordLoading = computed(() => this.loading() === 'change-password');
  readonly isAccountLoading = computed(() => this.loading() === 'switch-account');


  openForm(form: ActiveForm) {
    this.activeForm.set(form);
    this.settingsPageError.set(null);
  }

  closeForm() {
    this.activeForm.set(null);
    this.loading.set(null);
    this.settingsPageError.set(null);
  }

  startLoading(state: LoadingState) {
    this.loading.set(state);
  }

  stopLoading() {
    this.loading.set(null);
  }

  setError(error: string | null) {
    this.settingsPageError.set(error);
  }

  reset() {
    this.activeForm.set(null);
    this.loading.set(null);
    this.settingsPageError.set(null);
  }
}
