import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import dayjs from '@/app/shared/config/dayjs/dayjs-config'
import { SkeletonLine } from "@/app/shared/components/skeleton-line/skeleton-line";

@Component({
  selector: 'app-sub-stat-card',
  imports: [SkeletonLine],
  templateUrl: './sub-stat-card.html',
  styleUrl: './sub-stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubStatCard {
  private service = inject(StatisticsPageService);
  readonly sub = computed(() => this.service.statisticSubscriptions());
  readonly loading = computed(() => this.service.loadingSubscriptions());

  formatDate(date: string) {
    return dayjs(date).format('DD MMM');
  }

  formatAmount(amount: number) {
    return amount.toLocaleString('ru-RU');
  }

  decimalPart(amount: number) {
    return amount.toFixed(2).split('.')[1];
  }

  readonly items = computed(() => {
    return this.sub()?.items ?? [];
  });
}
