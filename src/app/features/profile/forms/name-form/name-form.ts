import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ProfilePageService } from '../../service/profile.service';
import { ProfileStore } from '../../store/profile.store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiTextfield, TuiTextfieldComponent } from '@taiga-ui/core';
import { SettingsStore } from '../../store/settings.store';
import { SkeletonLine } from '@/app/shared/components/skeleton-line/skeleton-line';

@Component({
  selector: 'app-name-form',
  imports: [TuiTextfieldComponent, ReactiveFormsModule, TuiTextfield, TuiButton, SkeletonLine],
  templateUrl: './name-form.html',
  styleUrl: './name-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameForm {
  private profileService = inject(ProfilePageService);
  private profileStore = inject(ProfileStore);
  private settingsStore = inject(SettingsStore);
  private fb = inject(FormBuilder);

  readonly isNameOpened = this.settingsStore.isNameOpened;
  readonly isNameLoading = this.settingsStore.isNameLoading;
  readonly loading = computed(() => this.profileStore.loading());

  readonly fullName = computed(
    () =>
      `${this.profileStore.user()?.firstName ?? ''} ${this.profileStore.user()?.lastName ?? ''}`,
  );

  nameForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  ngOnInit() {
    const user = this.profileStore.user();

    if (user) {
      this.nameForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }

  openEdit() {
    const user = this.profileStore.user();

    if (user) {
      this.nameForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      Object.keys(this.nameForm.controls).forEach((key) => {
        this.nameForm.get(key)?.setErrors(null);
      });
    }

    this.settingsStore.openForm('name');
  }

  cancelEdit() {
    this.settingsStore.closeForm();
  }

  saveName() {
    if (this.nameForm.invalid) {
      this.nameForm.markAllAsTouched();
      return;
    }

    this.profileService.updateName(
      {
        firstName: this.nameForm.value.firstName!,
        lastName: this.nameForm.value.lastName!,
      },
      (fieldErrors) => {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          this.nameForm.get(field)?.setErrors({
            backend: message,
          });
        });
      },
    );
  }
}
