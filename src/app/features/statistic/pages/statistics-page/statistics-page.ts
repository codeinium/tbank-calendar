import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StatisticsPageService } from '../../services/statistics.service';
import { StatsHeader } from '../../components/stats-header/stats-header';
import { StatisticsPageStore } from '../../services/statistics.store';
import { BalanceCard } from '../../components/1-row/balance-card/balance-card';
import { IncomeCard } from "../../components/1-row/income-card/income-card";
import { ExpenseCard } from "../../components/1-row/expense-card/expense-card";
import { CategoryChartPie } from "../../components/2-row/category-chart-pie/category-chart-pie";
import { ChartLine } from '../../components/2-row/chart-line/chart-line';
import { SubStatCard } from "../../components/2-row/sub-stat-card/sub-stat-card";
import { GoalsStatCard } from '../../components/3-row/goals-stat-card/goals-stat-card';
import { ImpulseIndexCard } from "../../components/3-row/impulse-index-card/impulse-index-card";
import { SpendingSpeedCard } from "../../components/3-row/spending-speed-card/spending-speed-card";

@Component({
  selector: 'app-statistics-page',
  imports: [StatsHeader, BalanceCard, IncomeCard, ExpenseCard, CategoryChartPie, ChartLine, SubStatCard, GoalsStatCard, ImpulseIndexCard, SpendingSpeedCard],
  templateUrl: './statistics-page.html',
  styleUrl: './statistics-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StatisticsPageService, StatisticsPageStore],
})
export class StatisticsPageComponent {
  statisticsService = inject(StatisticsPageService);

  ngOnInit() {
    this.statisticsService.loadPage();
  }
}
