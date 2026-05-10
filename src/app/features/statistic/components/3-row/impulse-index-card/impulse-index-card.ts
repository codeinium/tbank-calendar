import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { StatisticsPageService } from '../../../services/statistics.service';

@Component({
  selector: 'app-impulse-index-card',
  imports: [],
  templateUrl: './impulse-index-card.html',
  styleUrl: './impulse-index-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpulseIndexCard {
  private service = inject(StatisticsPageService);
  readonly index = computed(() => this.service.dashboard()?.impulseIndex);
}
