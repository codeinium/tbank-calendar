import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ProfileStore } from '../../store/profile.store';
import { RouterLink } from '@angular/router';
import { SkeletonLine } from '@/app/shared/components/skeleton-line/skeleton-line';

@Component({
  selector: 'app-personal-data',
  imports: [RouterLink, SkeletonLine],
  templateUrl: './personal-data.html',
  styleUrl: './personal-data.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalData {
  private store = inject(ProfileStore);

  readonly fullName = computed(
    () => `${this.store.user()?.firstName ?? ''} ${this.store.user()?.lastName ?? ''}`,
  );

  readonly phone = computed(() => this.store.user()?.phone);
  readonly email = computed(() => this.store.user()?.email);
  readonly activeAccount = computed(() => this.store.activeAccount()?.accountNumber);
  readonly loading = computed(() => this.store.loading());
}

