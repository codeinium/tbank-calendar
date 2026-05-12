import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import { SummaryCard } from "../summary-card/summary-card";
import { SummaryCardSkeleton } from '../summary-card-skeleton/summary-card-skeleton';

@Component({
  selector: 'app-income-card',
  imports: [SummaryCard, SummaryCardSkeleton],
  templateUrl: './income-card.html',
  styleUrl: './income-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeCard {
  private service = inject(StatisticsPageService);
  readonly summary = computed(() => this.service.dashboard()?.summary.income);
  readonly loading = computed(() => this.service.loadingDashboard());
}
