import { ChangeDetectionStrategy, Component } from '@angular/core';
import { weekDayLabelsShort } from '@/app/models/calendar/types';
import { SkeletonLine } from '@/app/shared/components/skeleton-line/skeleton-line';
import { SkeletonBlock } from '@/app/shared/components/skeleton-block/skeleton-block';

@Component({
  selector: 'app-goals-info-skeleton',
  imports: [SkeletonBlock, SkeletonLine],
  templateUrl: './goals-info-skeleton.html',
  styleUrl: './goals-info-skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsInfoSkeleton {
  readonly weekDayLabels = weekDayLabelsShort;
}
