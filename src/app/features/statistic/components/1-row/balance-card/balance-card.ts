import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import { SummaryCard } from '../summary-card/summary-card';

@Component({
  selector: 'app-balance-card',
  imports: [SummaryCard],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceCard {
  private service = inject(StatisticsPageService);
  readonly summary = computed(() => this.service.dashboard()?.summary.currentBalance);
}
