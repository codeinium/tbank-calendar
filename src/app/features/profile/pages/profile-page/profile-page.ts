import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ProfilePageService } from '../../service/profile.service';
import { ProfileHeader } from '../../components/profile-header/profile-header';
import { PersonalData } from '../../components/personal-data/personal-data';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, PersonalData],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  private profileService = inject(ProfilePageService);

  ngOnInit() {
    this.profileService.loadProfileData();
  }
}
