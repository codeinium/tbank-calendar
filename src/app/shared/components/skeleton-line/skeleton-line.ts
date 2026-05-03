import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-line',
  template: ` <div class="rounded-(--tui-radius-l) animate-pulse" [ngClass]="classes"></div> `,
  imports: [NgClass],
  host: {
    class: 'block',
  },
})
export class SkeletonLine {
  @Input() width = '';
  @Input() height = '';
  @Input() color: 'light' | 'dark' = 'light';

  get classes() {
    return [
      this.width,
      this.height,
      this.color === 'light' ? 'bg-(--loading-2)' : 'bg-(--loading-1)',
    ].join(' ');
  }
}