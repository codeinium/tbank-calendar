import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import { SummaryCard } from "../summary-card/summary-card";

@Component({
  selector: 'app-income-card',
  imports: [SummaryCard],
  templateUrl: './income-card.html',
  styleUrl: './income-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeCard {
  private service = inject(StatisticsPageService);
  readonly summary = computed(() => this.service.dashboard()?.summary.income);
}
