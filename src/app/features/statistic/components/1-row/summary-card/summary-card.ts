import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [NgClass],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryCard {
  @Input({ required: true }) bgColor!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) amount!: number;
  @Input({ required: true }) differenceFromPreviousPeriod!: number;
  @Input({ required: true }) percentChange!: number;
  @Input({ required: true }) transactionCount!: number;
  @Input({ required: true }) categoryCount!: number;

  get isPositive() {
    return this.differenceFromPreviousPeriod >= 0;
  }

  get integerPart(): string {
    return Math.floor(this.amount).toLocaleString('ru-RU');
  }

  get decimalPart(): string | null {
    return this.amount.toFixed(2).split('.')[1];
  }

  get labelIspositive() {
    return this.differenceFromPreviousPeriod >= 0 ? 'больше' : 'меньше';
  }

  get absDifferenceFromPreviousPeriod() {
    return Math.abs(this.differenceFromPreviousPeriod);
  }
}
