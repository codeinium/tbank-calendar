import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';

@Component({
  selector: 'app-spending-speed-card',
  imports: [],
  templateUrl: './spending-speed-card.html',
  styleUrl: './spending-speed-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpendingSpeedCard {
  private service = inject(StatisticsPageService);
  readonly spendingSpeed = computed(() => this.service.dashboard()?.spendingSpeed);
}
