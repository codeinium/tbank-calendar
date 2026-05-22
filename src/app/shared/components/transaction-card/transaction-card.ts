import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Transaction } from '../../../models/transaction/transaction.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';

@Component({
  selector: 'app-transaction-card',
  imports: [CommonModule],
  templateUrl: './transaction-card.html',
})
export class TransactionCard {
  @Input() transaction!: Transaction;
  @Input() variant: 'month' | 'week' | 'day' | 'goal' = 'month';

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

  get dateLabel() {
    return dayjs(this.transaction.date).format('D MMMM YYYY');
  }

  get title() {
    return this.transaction.counterpartyName;
  }

  get categoryLabel() {
    return this.transaction.categoryName;
  }

  get descriptionLabel() {
    return this.transaction.description;
  }

  get typeLabel() {
    return this.isIncome ? 'Доход' : 'Расход';
  }

  get detailsLabel() {
    return `${this.categoryLabel} · ${this.typeLabel}`;
  }
}
