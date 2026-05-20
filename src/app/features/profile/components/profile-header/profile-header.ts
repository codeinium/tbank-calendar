import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { ProfilePageService } from '../../service/profile.service';
import { ProfileStore } from '../../store/profile.store';
import dayjs from '@/app/shared/config/dayjs/dayjs-config'

@Component({
  selector: 'app-profile-header',
  imports: [],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeader {
  private store = inject(ProfileStore);

  readonly name = computed(() => this.store.user()?.firstName);

  setGreeting() {
    const hour = dayjs().hour();

    if (hour >= 5 && hour < 12) {
      return 'Доброе утро';
    } else if (hour >= 12 && hour < 18) {
      return 'Добрый день';
    } else if (hour >= 18 && hour < 23) {
      return 'Добрый вечер';
    } else {
      return 'Доброй ночи';
    }
  }
}
