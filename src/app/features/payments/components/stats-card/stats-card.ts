import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  imports: [],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCard {
  @Input() title!: string;
  @Input() monthlyTotal!: Signal<number>;
  @Input() yearlyTotal!: Signal<number>;
  @Input() activeCount!: Signal<number>;
  @Input() upcomingCount!: Signal<number>;
}
