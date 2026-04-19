import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
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
  readonly service = inject(GoalService);
  readonly chartData = this.service.chartData;
  readonly range = this.service.range;
  readonly selectedBucket = this.service.selectedBucket;

  private getTodayIndex(): number {
    const data = this.chartData();
    const range = this.range();

    const todayKey = this.service.getPeriodKey(dayjs().toISOString(), range);

    return data.findIndex((item) => item.key === todayKey);
  }

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

    const index = this.getTodayIndex();
    if (index === -1) return;

    const selectedElement = items[index].nativeElement;
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
    this.service.setRange(range as any);
  }

  setBucket(key: string | null) {
    this.service.selectBucket(key);
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