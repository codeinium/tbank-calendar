import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { GoalsPageStore } from '../../services/goal-page.store';
import { TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';
import { TransactionCard } from '@/app/shared/components/transaction-card/transaction-card';

@Component({
  selector: 'app-goals-history',
  imports: [TuiTextfield, TuiIcon, TuiTooltip, TransactionCard],
  templateUrl: './goals-history.html',
  styleUrl: './goals-history.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsHistory {
  private goalService = inject(GoalService);
  private store = inject(GoalsPageStore);
  readonly isEmpty = computed(() => this.goalService.chartData().length === 0);

  readonly filteredTransactions = computed(() => {
    const bucket = this.goalService.selectedBucket();
    const transactions = this.store.transactions();
    const range = this.goalService.range();
    if (!bucket) return transactions;
    return transactions.filter((t) => this.goalService.getPeriodKey(t.date, range) === bucket);
  });

  readonly periodTitle = computed(() => {
    const bucket = this.goalService.selectedBucket();
    const range = this.goalService.range();
    if (!bucket) return 'весь период';
    const d = dayjs(bucket);
    if (range === 'days') return d.format('D MMMM YYYY');
    if (range === 'years') return d.format('YYYY');
    return d.format('MMMM YYYY');
  });
}
