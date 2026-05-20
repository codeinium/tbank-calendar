import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NameForm } from '../../forms/name-form/name-form';
import { RouterLink } from '@angular/router';
import { SettingsStore } from '../../store/settings.store';
import { ProfilePageService } from '../../service/profile.service';
import { PasswordForm } from '../../forms/password-form/password-form';
import { EmailForm } from '../../forms/email-form/email-form';
import { TuiButton } from "@taiga-ui/core";
import { SwitchAccount } from "../../forms/switch-account/switch-account";

@Component({
  selector: 'app-settings-page',
  imports: [RouterLink, NameForm, PasswordForm, EmailForm, TuiButton, SwitchAccount],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class SettingsPage {
  private settingsStore = inject(SettingsStore);
  private profileService = inject(ProfilePageService);

  ngOnInit() {
    this.profileService.loadProfileData();
  }
  ngOnDestroy() {
    this.settingsStore.reset();
  }
  logout() {
    this.profileService.logout();
  }
}
