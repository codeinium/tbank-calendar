import { GoalPageUiService } from './../../service/goal-page-ui.service';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgClass } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-goals-chart',
  imports: [NgClass, TuiButton],
  templateUrl: './goals-chart.html',
  styleUrl: './goals-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsChart implements AfterViewInit {
  readonly goalUiService = inject(GoalPageUiService);
  readonly chartData = this.goalUiService.chartData;
  readonly range = this.goalUiService.range;
  readonly selectedBucket = this.goalUiService.selectedBucket;
  readonly isEmpty = computed(() => this.chartData().length === 0);

  @ViewChild('scrollContainer')
  scrollContainer!: ElementRef<HTMLDivElement>;

  @ViewChildren('carouselItem')
  itemsRef!: QueryList<ElementRef<HTMLDivElement>>;

  ngAfterViewInit() {
    this.scrollToSelected();
  }

  constructor() {
    effect(() => {
      this.chartData();
      this.range();
      queueMicrotask(() => {
        this.scrollToSelected();
      });
    });
  }

  private scrollToSelected() {
    const container = this.scrollContainer?.nativeElement;
    if (!container) return;

    const items = this.itemsRef?.toArray();
    if (!items?.length) return;

    const lastIndex = items.length - 1;
    const selectedElement = items[lastIndex].nativeElement;

    const containerWidth = container.offsetWidth;
    const itemOffset = selectedElement.offsetLeft;
    const itemWidth = selectedElement.offsetWidth;

    container.scrollLeft = itemOffset - containerWidth / 2 + itemWidth / 2;
  }

  scrollLeft() {
    this.scrollByAmount(-1);
  }

  scrollRight() {
    this.scrollByAmount(1);
  }

  setRange(range: string) {
    this.goalUiService.setRange(range as any);
  }

  setBucket(key: string | null) {
    this.goalUiService.selectBucket(key);
  }

  private scrollByAmount(direction: number) {
    const container = this.scrollContainer.nativeElement;

    const scrollAmount = container.offsetWidth * 0.9;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  }
}