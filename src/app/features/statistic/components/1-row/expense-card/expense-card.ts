import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import { SummaryCard } from "../summary-card/summary-card";

@Component({
  selector: 'app-expense-card',
  imports: [SummaryCard],
  templateUrl: './expense-card.html',
  styleUrl: './expense-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseCard {
  private service = inject(StatisticsPageService);
  readonly summary = computed(() => this.service.dashboard()?.summary.expenses);
}
