import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { StatisticsPageService } from '../../services/statistics.service';
import { StatsHeader } from '../../components/stats-header/stats-header';
import { StatisticsPageStore } from '../../services/statistics.store';

@Component({
  selector: 'app-statistics-page',
  imports: [StatsHeader],
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
