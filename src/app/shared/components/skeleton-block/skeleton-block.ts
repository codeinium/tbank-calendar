import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-block',
  template: `
    <div class="bg-(--loading-1) rounded-(--tui-radius-l)" [ngClass]="height + ' ' + width"></div>
  `,
  imports: [NgClass]
})
export class SkeletonBlock {
  @Input() width = '';
  @Input() height = '';
}
