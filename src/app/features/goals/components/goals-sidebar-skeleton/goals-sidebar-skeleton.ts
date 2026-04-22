import { SkeletonBlock } from '@/app/shared/components/skeleton-block/skeleton-block';
import { SkeletonLine } from '@/app/shared/components/skeleton-line/skeleton-line';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-goals-sidebar-skeleton',
  imports: [SkeletonBlock, SkeletonLine],
  templateUrl: './goals-sidebar-skeleton.html',
  styleUrl: './goals-sidebar-skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsSidebarSkeleton {}
