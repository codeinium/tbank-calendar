import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import { SkeletonLine } from "@/app/shared/components/skeleton-line/skeleton-line";

@Component({
  selector: 'app-spending-speed-card',
  imports: [SkeletonLine],
  templateUrl: './spending-speed-card.html',
  styleUrl: './spending-speed-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpendingSpeedCard {
  private service = inject(StatisticsPageService);
  readonly spendingSpeed = computed(() => this.service.dashboard()?.spendingSpeed);
  readonly loading = computed(() => this.service.loadingDashboard());
}
