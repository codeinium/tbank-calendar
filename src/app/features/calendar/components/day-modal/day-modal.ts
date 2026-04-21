import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { CommonModule } from '@angular/common';
import { TransactionCard } from '@/app/shared/components/transaction-card/transaction-card';
import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';

@Component({
  selector: 'app-day-modal',
  imports: [CommonModule, TransactionCard, ModalDialog],
  templateUrl: './day-modal.html',
  styleUrl: './day-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayModal {
  private calendar = inject(CalendarService);

  readonly modal = this.calendar.modalState;
  readonly date = computed(() => this.modal().date?.format('dddd DD MMMM YYYY') ?? '');
  readonly hours = Array.from({ length: 24 }, (_, i) => i);

  readonly transactionsByHour = computed(() => {
    const transactions = this.modal().transactions;
    const map: Record<number, typeof transactions> = {};
    for (const t of transactions) {
      const hour = new Date(t.date).getHours();
      if (!map[hour]) map[hour] = [];
      map[hour].push(t);
    }

    return map;
  });

  close() {
    this.calendar.closeDayModal();
  }
}
