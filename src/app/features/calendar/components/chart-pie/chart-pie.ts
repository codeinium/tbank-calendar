import { Component, Input, OnChanges, signal, computed } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Transaction } from '@/app/models/transaction/transaction.model';

@Component({
  selector: 'app-chart-pie',
  imports: [BaseChartDirective],
  templateUrl: './chart-pie.html',
  styleUrls: ['./chart-pie.scss'],
})
export class ChartPie {
  private _transactions = signal<Transaction[]>([]);
  @Input() set transactions(value: Transaction[]) {
    this._transactions.set(value ?? []);
  }

  readonly categories = computed(() => {
    const map = new Map<string, { amount: number; color: string }>();

    this._transactions()
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const current = map.get(t.categoryName);

        map.set(t.categoryName, {
          amount: (current?.amount ?? 0) + t.amount,
          color: t.categoryColor,
        });
      });

    return Array.from(map.entries()).map(([label, value]) => ({
      label,
      ...value,
    }));
  });

  readonly chartData = computed(() => {
    const categories = this.categories();

    return {
      labels: categories.map((c) => c.label),
      datasets: [
        {
          data: categories.map((c) => c.amount),
          backgroundColor: categories.map((c) => c.color),
          borderWidth: 0,
          borderRadius: 20,
          spacing: 5,
        },
      ],
    };
  });

  readonly chartOptions = {
    responsive: true,
    cutout: '79%',
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

  readonly view = computed(() => {
    const categories = this.categories();
    const expanded = this.isExpanded();

    const visible = expanded ? categories : categories.slice(0, this.maxVisibleCategories);

    return {
      visible,
      hasMore: categories.length > this.maxVisibleCategories,
      remaining: categories.length - this.maxVisibleCategories,
      expanded,
    };
  });
}
