import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TuiButton, TuiTextfield, TuiTextfieldComponent} from '@taiga-ui/core';

import { ProfilePageService } from '../../service/profile.service';
import { ProfileStore } from '../../store/profile.store';
import { SettingsStore } from '../../store/settings.store';
import { SkeletonLine } from '@/app/shared/components/skeleton-line/skeleton-line';

@Component({
  selector: 'app-email-form',
  imports: [TuiTextfieldComponent, ReactiveFormsModule, TuiTextfield, TuiButton, SkeletonLine],
  templateUrl: './email-form.html',
  styleUrl: './email-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailForm {
  private readonly profileService = inject(ProfilePageService);
  private readonly profileStore = inject(ProfileStore);
  private readonly settingsStore = inject(SettingsStore);
  private readonly fb = inject(FormBuilder);

  readonly isEmailOpened = this.settingsStore.isEmailOpened;
  readonly isSendCodeLoading = this.settingsStore.isSendEmailCodeLoading;
  readonly isConfirmCodeLoading = this.settingsStore.isConfirmEmailLoading;
  readonly currentEmail = computed(() => this.profileStore.user()?.email ?? null);
  readonly step = signal<'input' | 'confirm'>('input');

  readonly error = computed(() => this.settingsStore.settingsPageError());
  readonly loading = computed(() => this.profileStore.loading());

  readonly emailForm = this.fb.group({
    newEmail: ['', [Validators.required, Validators.email]],
  });

  readonly codeForm = this.fb.group({
    verificationCode: ['', Validators.required],
  });

  openEdit() {
    this.step.set('input');

    this.emailForm.patchValue({
      newEmail: this.currentEmail() || '',
    });

    this.codeForm.reset();

    this.clearErrors();

    this.settingsStore.openForm('email');
  }

  cancelEdit() {
    this.settingsStore.closeForm();
  }

  goToInputStep() {
    this.step.set('input');

    this.codeForm.reset();

    this.clearErrors();
  }

  sendCode() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.profileService.sendEmailVerification(
      { email: this.emailForm.value.newEmail! },
      (fieldErrors) => this.mapErrors(this.emailForm, fieldErrors),
      () => {
        this.step.set('confirm');
      },
    );
  }

  confirmCode() {
    if (this.codeForm.invalid) {
      this.codeForm.markAllAsTouched();
      return;
    }

    this.profileService.confirmEmail(
      {
        email: this.emailForm.value.newEmail!,
        code: this.codeForm.value.verificationCode!,
      },
      (fieldErrors) => this.mapErrors(this.codeForm, fieldErrors),
    );
  }

  deleteEmail() {
    if (!this.currentEmail()) {
      return;
    }

    this.profileService.deleteEmail();
  }

  private clearErrors() {
    this.settingsStore.setError(null);

    this.emailForm.controls.newEmail?.setErrors(null);

    this.codeForm.controls.verificationCode?.setErrors(null);
  }

  private mapErrors(form: any, errors: Record<string, string>) {
    Object.entries(errors).forEach(([field, message]) => {
      form.get(field)?.setErrors({
        backend: message,
      });
    });
  }
}
