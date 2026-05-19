import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield, TuiTextfieldComponent } from '@taiga-ui/core';
import { ProfilePageService } from '../../service/profile.service';
import { SettingsStore } from '../../store/settings.store';
import { passwordMatchValidator } from '@/app/shared/helpers/password.validator';
import { TuiPassword } from "@taiga-ui/kit";

@Component({
  selector: 'app-password-form',
  imports: [
    TuiTextfieldComponent,
    ReactiveFormsModule,
    TuiTextfield,
    TuiButton,
    TuiPassword,
    TuiIcon,
  ],
  templateUrl: './password-form.html',
  styleUrl: './password-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordForm {
  private profileService = inject(ProfilePageService);
  private settingsStore = inject(SettingsStore);
  private fb = inject(FormBuilder);

  readonly isPasswordOpened = this.settingsStore.isPasswordOpened;

  readonly isPasswordLoading = this.settingsStore.isPasswordLoading;

  passwordForm = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
      updateOn: 'change',
    },
  );

  openEdit() {
    this.passwordForm.reset();
    Object.keys(this.passwordForm.controls).forEach((key) => {
      this.passwordForm.get(key)?.setErrors(null);
    });
    this.settingsStore.openForm('password');
  }

  cancelEdit() {
    this.settingsStore.closeForm();
  }

  savePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.profileService.changePassword(
      {
        currentPassword: this.passwordForm.value.currentPassword!,
        newPassword: this.passwordForm.value.newPassword!,
      },
      (fieldErrors) => {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          this.passwordForm.get(field)?.setErrors({ backend: message });
        });
      },
    );
  }
}
