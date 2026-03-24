import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-month-view',
  imports: [],
  templateUrl: './month-view.html',
  styleUrl: './month-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthView {}
