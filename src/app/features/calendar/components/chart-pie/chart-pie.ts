import { Component, Input, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Transaction } from '@/app/models/transaction/model/transaction.model';

@Component({
  selector: 'app-chart-pie',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart-pie.html',
  styleUrls: ['./chart-pie.scss'],
})
export class ChartPie implements OnChanges {
  @Input() transactions: Transaction[] = [];
  chartData: any = { labels: [], datasets: [{ data: [] }] };
  chartOptions = {
    responsive: true,
    cutout: '79%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  ngOnChanges() {
    const map = new Map<string, { amount: number; color: string }>();

    this.transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const current = map.get(t.category.name);

        map.set(t.category.name, {
          amount: (current?.amount ?? 0) + t.amount,
          color: t.category.color,
        });
      });

    this.chartData = {
      labels: Array.from(map.keys()),
      datasets: [
        {
          data: Array.from(map.values()).map((v) => v.amount),
          backgroundColor: Array.from(map.values()).map((v) => v.color),
          borderWidth: 0,
          borderRadius: 20,
          spacing: 5,
        },
      ],
    };
  }

  maxVisibleCategories = 5;
  isExpanded = false;

  get visibleLabels() {
    if (!this.chartData.labels) return [];
    if (this.isExpanded) return this.chartData.labels;
    return this.chartData.labels.slice(0, this.maxVisibleCategories);
  }

  get hasMoreCategories() {
    return this.chartData.labels && this.chartData.labels.length > this.maxVisibleCategories;
  }

  get remainingCount() {
    if (!this.chartData.labels) return 0;
    return this.chartData.labels.length - this.maxVisibleCategories;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}