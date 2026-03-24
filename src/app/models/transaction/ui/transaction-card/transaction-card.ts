import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Transaction } from '../../model/transaction.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-card.html',
})
export class TransactionCard {
  @Input() transaction!: Transaction;
  @Input() variant: 'month' | 'week' | 'day' | 'full' = 'month';

  get isIncome() {
    return this.transaction.type === 'income';
  }

  get amountLabel() {
    const sign = this.isIncome ? '+' : '-';
    return `${sign}${this.transaction.amount.toLocaleString()} ₽`;
  }

  get timeLabel() {
    return dayjs(this.transaction.date).format('HH:mm');
  }
}
