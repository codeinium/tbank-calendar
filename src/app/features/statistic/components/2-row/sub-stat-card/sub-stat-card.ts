import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import dayjs from '@/app/shared/config/dayjs/dayjs-config'

@Component({
  selector: 'app-sub-stat-card',
  imports: [],
  templateUrl: './sub-stat-card.html',
  styleUrl: './sub-stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubStatCard {
  private service = inject(StatisticsPageService);
  readonly sub = computed(() => this.service.statisticSubscriptions());

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
  })
}
