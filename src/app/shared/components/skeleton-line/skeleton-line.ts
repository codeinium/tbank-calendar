import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-line',
  template: `
    <div
      class="bg-(--loading-2) rounded-(--tui-radius-l) animate-pulse [animation-duration:1s]"
      [ngClass]="height + ' ' + width"
    ></div>
  `,
  imports: [NgClass]
})
export class SkeletonLine {
  @Input() width = '';
  @Input() height = '';
}