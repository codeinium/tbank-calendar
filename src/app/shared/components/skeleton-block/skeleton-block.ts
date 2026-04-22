import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-block',
  template: `
    <div class="bg-(--loading-1) rounded-(--tui-radius-l) flex flex-col" [ngClass]="classes">
      <ng-content />
    </div>
  `,
  imports: [NgClass],
})
export class SkeletonBlock {
  @Input() width = '';
  @Input() height = '';

  @Input() px: string = 'px-0';
  @Input() py: string = 'py-0';
  @Input() gap: string = 'gap-0';

  get classes() {
    return [this.width, this.height, this.px, this.py, this.gap].filter(Boolean).join(' ');
  }
}
