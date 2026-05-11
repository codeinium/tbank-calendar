import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SkeletonLine } from '@/app/shared/components/skeleton-line/skeleton-line';

@Component({
  selector: 'app-summary-card-skeleton',
  imports: [SkeletonLine],
  templateUrl: './summary-card-skeleton.html',
  styleUrl: './summary-card-skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryCardSkeleton {
}
