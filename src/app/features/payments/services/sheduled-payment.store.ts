import { SheduledPayment } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { ReminderPaymentService } from '@/app/services/reminder-payment/reminder-payment.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import { take } from 'rxjs';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { SortName, SortDirection } from '../types/type';

@Injectable()
export class SheduledPaymentStore {
  private apiService = inject(ReminderPaymentService);

  private readonly _sheduledPayments = signal<SheduledPayment[]>([]);
  private readonly _loadingShedulePayments = signal(true);
  private readonly _error = signal<string | null>(null);

  readonly sheduledPayments = this._sheduledPayments.asReadonly();
  readonly loadingSheduledPayments = this._loadingShedulePayments.asReadonly();
  readonly error = this._error.asReadonly();

  private search = signal('');
  private sortBy = signal<SortName>('date');
  private sortDir = signal<SortDirection>('asc');

  setSortBy(sortName: SortName) {
    this.sortBy.set(sortName);
  }

  setSortDir(sortName: SortDirection) {
    this.sortDir.set(sortName);
  }

  setSearch(value: string) {
    this.search.set(value);
  }

  loadSheduledPayments() {
    this._loadingShedulePayments.set(true);
    this._error.set(null);
    this.apiService
      .getShedulePayments()
      .pipe(take(1))
      .subscribe({
        next: (shedulePayments) => {
          this._sheduledPayments.set(shedulePayments);
          this._loadingShedulePayments.set(false);
        },
        error: (err) => {
          this._error.set(err.message);
          this._loadingShedulePayments.set(false);
        },
      });
  }

  monthlyTotal = computed(() => this.sheduledPayments().reduce((sum, s) => sum + s.amount, 0));
  yearlyTotal = computed(() =>
    this.sheduledPayments().reduce((sum, s) => {
      if (s.billingCycle === 'monthly') return sum + s.amount * 12;
      if (s.billingCycle === 'yearly') return sum + s.amount;
      return sum;
    }, 0),
  );

  readonly upcomingSheduledPayments = computed(() => {
    const subs = this.sheduledPayments();

    const now = dayjs().startOf('day');
    const limit = now.add(3, 'day').endOf('day');

    return subs.filter((s) => {
      const date = dayjs(s.nextBillingDate);

      return date.isBetween(now, limit, null, '[]');
    });
  });
  readonly upcomingCount = computed(() => this.upcomingSheduledPayments().length);

  activeCount = computed(() => this.sheduledPayments().filter((s) => s.status === 'active').length);

  filteredSheduledPayments = computed(() => {
    let data = this.sheduledPayments();

    const search = this.search();

    if (search) {
      data = data.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));
    }

    return data;
  });

  sortedSheduledPayments = computed(() => {
    const data = this.filteredSheduledPayments();
    const sortBy = this.sortBy();
    const dir = this.sortDir();

    return [...data].sort((a, b) => {
      let result = 0;

      if (sortBy === 'price') {
        result = a.amount - b.amount;
      }

      if (sortBy === 'date') {
        result = dayjs(a.nextBillingDate).diff(dayjs(b.nextBillingDate));
      }

      if (sortBy === 'name') {
        result = a.title.localeCompare(b.title);
      }

      return dir === 'asc' ? result : -result;
    });
  });
}
