import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';
import { TransactionType } from '@/app/models/types/transaction.type';
import { BaseChartDirective } from 'ng2-charts';
import { TuiButton } from '@taiga-ui/core';
import { SkeletonLine } from "@/app/shared/components/skeleton-line/skeleton-line";

@Component({
  selector: 'app-category-chart-pie',
  imports: [BaseChartDirective, TuiButton, SkeletonLine],
  templateUrl: './category-chart-pie.html',
  styleUrl: './category-chart-pie.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryChartPie {
  private service = inject(StatisticsPageService);

  readonly loading = computed(() => this.service.loadingDashboard());
  readonly selectedDate = computed(this.service.selectedDate);
  readonly selectedType = signal<TransactionType>('expense');

  readonly distribution = computed(() => {
    const dashboard = this.service.dashboard();

    if (!dashboard) return null;

    return this.selectedType() === 'expense'
      ? dashboard.categoryDistribution.expenses
      : dashboard.categoryDistribution.income;
  });

  readonly chartData = computed(() => {
    const distribution = this.distribution();

    if (!distribution) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: distribution.items.map((item) => item.categoryName),
      datasets: [
        {
          data: distribution.items.map((item) => item.amount),
          backgroundColor: distribution.items.map((item) => item.color),
          borderWidth: 0,
          borderRadius: 20,
          spacing: 4,
        },
      ],
    };
  });

  readonly chartOptions = {
    responsive: true,
    cutout: '78%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  readonly maxVisibleCategories = 5;
  readonly isExpanded = signal(false);

  toggleExpand() {
    this.isExpanded.update((v) => !v);
  }

  changeType(type: TransactionType) {
    this.selectedType.set(type);
    this.isExpanded.set(false);
  }

  readonly view = computed(() => {
    const distribution = this.distribution();

    if (!distribution) {
      return {
        visible: [],
        hasMore: false,
        remaining: 0,
        expanded: false,
      };
    }

    const items = distribution.items;
    const expanded = this.isExpanded();

    const visible = expanded ? items : items.slice(0, this.maxVisibleCategories);

    return {
      visible,
      hasMore: items.length > this.maxVisibleCategories,
      remaining: items.length - this.maxVisibleCategories,
      expanded,
    };
  });
}
