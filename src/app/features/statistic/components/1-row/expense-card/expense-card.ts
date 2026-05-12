import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import { SummaryCard } from "../summary-card/summary-card";
import { SummaryCardSkeleton } from '../summary-card-skeleton/summary-card-skeleton';

@Component({
  selector: 'app-expense-card',
  imports: [SummaryCard, SummaryCardSkeleton],
  templateUrl: './expense-card.html',
  styleUrl: './expense-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseCard {
  private service = inject(StatisticsPageService);
  readonly summary = computed(() => this.service.dashboard()?.summary.expenses);
  readonly loading = computed(() => this.service.loadingDashboard());
}
