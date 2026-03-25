import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { Dayjs } from 'dayjs';
import { CalendarService } from '@/app/features/calendar/services/calendar.service';
import { TransactionCard } from '@/app/models/transaction/ui/transaction-card/transaction-card';
import type { Transaction } from '@/app/models/transaction/model/transaction.model';
import type { CalendarView } from '@/app/models/calendar/types';

@Component({
  selector: 'app-day-cell',
  standalone: true,
  imports: [CommonModule, TransactionCard],
  templateUrl: './day-cell.html',
  host: {
    '(click)': 'openModal()',
    '[class]': 'backgroundClass()',
    class:
      'min-w-12 min-h-27 sm:min-w-6.3 sm:min-h-30 lg:min-w-15 lg:min-h-44 rounded-md sm:rounded-xl lg:rounded-3xl p-0.5 sm:p-1.5 lg:p-2.75 flex flex-col cursor-pointer shadow-(--tui-shadow-m)',
  },
})
export class DayCell {
  readonly isCurrentMonth = input.required<boolean>();
  readonly date = input.required<Dayjs>();
  readonly transactions = input.required<Transaction[]>();

  private calendar = inject(CalendarService);

  readonly today = this.calendar.today;
  readonly dayMaxTransaction = this.calendar.dayMaxTransaction;
  readonly showIncomes = this.calendar.showIncomes;
  readonly showExpenses = this.calendar.showExpenses;
  readonly view = this.calendar.view;

  readonly isToday = computed(() => this.date().isSame(this.today(), 'day'));
  readonly isWeekend = computed(() => {
    const day = this.date().day();
    return day === 0 || day === 6;
  });
  readonly dayNumber = computed(() => this.date().format('D'));

  readonly filteredTransactions = computed(() => {
    const date = this.date();
    const showInc = this.showIncomes();
    const showExp = this.showExpenses();

    return this.transactions().filter((t) => {
      const transactionDay = dayjs(t.date);
      const isSameDay = transactionDay.isSame(date, 'day');
      if (!isSameDay) return false;
      if (t.type === 'expense' && !showExp) return false;
      if (t.type === 'income' && !showInc) return false;
      return true;
    });
  });

  readonly displayedTransactions = computed(() =>
    this.filteredTransactions().slice(0, this.dayMaxTransaction()),
  );

  readonly hasMore = computed(() => this.transactions().length - this.dayMaxTransaction() > 0);

  readonly sumOfDay = computed(() =>
    this.transactions().reduce(
      (acc, t) => (t.type === 'income' ? acc + t.amount : acc - t.amount),
      0,
    ),
  );

  readonly backgroundClass = computed(() => {
    const classes = [];
    if (!this.isCurrentMonth()) classes.push('bg-(--card-non-incoming)');
    else if (this.isWeekend()) classes.push('bg-white');
    else classes.push('bg-(--card-calendar-item)');
    return classes.join(' ');
  });

  readonly heightClass = computed(() => (this.view() === 'week' ? 'min-h-[1000px]' : ''));

  readonly sumClass = computed(() => {
    const sum = this.sumOfDay();
    if (sum === 0) return '';
    return sum > 0 ? 'text-(--income-background)' : 'text-(--expense-background)';
  });

  openModal() {
    this.calendar.openDayModal(this.date(), this.transactions());
  }

  formatSum(sum: number): string {
    if (sum === 0) return '';
    return `${sum > 0 ? '+' : '-'} ${Math.abs(sum)}`;
  }
}
