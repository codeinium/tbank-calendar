import { Transaction } from '@/app/models/transaction/model/transaction.model';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-line',
  imports: [],
  templateUrl: './chart-line.html',
  styleUrl: './chart-line.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLine {
  @Input() transactions: Transaction[] = [];
}
