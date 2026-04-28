import { Injectable, inject, computed } from '@angular/core';
import { BaseListStore } from './base-list.store';
import { SheduledPayment } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { ReminderPaymentService } from '@/app/services/reminder-payment/reminder-payment.service';
import { take } from 'rxjs';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';

@Injectable()
export class SheduledPaymentStore extends BaseListStore<SheduledPayment> {
  private api = inject(ReminderPaymentService);

  protected filterFn(p: SheduledPayment, search: string) {
    return p.title.toLowerCase().includes(search.toLowerCase());
  }

  protected sortFn(a: SheduledPayment, b: SheduledPayment, sortBy: string) {
    if (sortBy === 'price') return a.amount - b.amount;
    if (sortBy === 'date') return dayjs(a.nextBillingDate).diff(dayjs(b.nextBillingDate));
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0;
  }

  load() {
    this._loading.set(true);
    this._error.set(null);

    this.api
      .getShedulePayments()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this._items.set(data);
          this._loading.set(false);
        },
        error: (err) => {
          this._error.set(err.message);
          this._loading.set(false);
        },
      });
  }


  readonly monthlyTotal = computed(() => this.items().reduce((sum, s) => sum + s.amount, 0));

  readonly yearlyTotal = computed(() =>
    this.items().reduce((sum, s) => {
      if (s.billingCycle === 'monthly') return sum + s.amount * 12;
      if (s.billingCycle === 'yearly') return sum + s.amount;
      return sum;
    }, 0),
  );

  readonly activeCount = computed(() => this.items().filter((s) => s.status === 'active').length);

  readonly upcomingSheduledPayments = computed(() => {
    const now = dayjs().startOf('day');
    const limit = now.add(3, 'day').endOf('day');

    return this.items().filter((s) => dayjs(s.nextBillingDate).isBetween(now, limit, null, '[]'));
  });

  readonly upcomingCount = computed(() => this.upcomingSheduledPayments().length);
}
