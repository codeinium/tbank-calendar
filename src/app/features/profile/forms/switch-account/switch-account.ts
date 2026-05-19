import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ProfilePageService } from '../../service/profile.service';
import { ProfileStore } from '../../store/profile.store';
import { SettingsStore } from '../../store/settings.store';
import { Account } from '@/app/models/user/user.model';
import { FormsModule } from '@angular/forms';
import { TuiChevron, TuiDataListWrapper, TuiSelect, TuiSensitive, TuiSwitch } from '@taiga-ui/kit';
import { tuiItemsHandlersProvider, TuiTextfield, TuiLoader, TuiLabel } from '@taiga-ui/core';

@Component({
  selector: 'app-switch-account',
  imports: [
    FormsModule,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
    TuiTextfield,
    TuiLoader,
    TuiSensitive,
    TuiLabel,
    TuiSwitch,
  ],
  templateUrl: './switch-account.html',
  styleUrl: './switch-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchAccount {
  private readonly profileStore = inject(ProfileStore);
  private readonly profilePageService = inject(ProfilePageService);
  private readonly settingsStore = inject(SettingsStore);

  readonly accounts = this.profileStore.accounts;
  readonly activeAccount = this.profileStore.activeAccount;

  protected sensitive = true;

  stringifyAccount = (account: Account | null): string => {
    if (!account) return '';

    return `•••• •••• •••• ${account.accountNumber.slice(-4)}`;
  };

  readonly isSwitching = computed(() => this.settingsStore.activeForm() === 'account');

  switchAccount(account: Account) {
    if (account.accountId === this.activeAccount()?.accountId) {
      return;
    }

    this.profilePageService.switchAccount({
      accountId: account.accountId,
    });
  }

  disabledItems = (account: Account) => account.status === 'inactive';
}
