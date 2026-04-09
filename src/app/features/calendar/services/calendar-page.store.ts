import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { TransactionService } from '@/app/models/transaction/api/transaction.service';
import { CalendarService } from './calendar.service';
import { Transaction } from '@/app/models/transaction/model/transaction.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';

@Injectable()
export class CalendarPageStore {
  private transactionService = inject(TransactionService);
  private calendar = inject(CalendarService);

  private readonly cache = signal<Record<string, Transaction[]>>({});
  private readonly loading = signal<Record<string, boolean>>({});
  private readonly error = signal<Record<string, string | null>>({});

  readonly range = computed(() => {
    const view = this.calendar.view();
    const date = this.calendar.currentDate();

    if (view === 'month') {
      return {
        from: dayjs(date).startOf('month').toISOString(),
        to: dayjs(date).endOf('month').toISOString(),
      };
    }

    return {
      from: dayjs(date).startOf('week').toISOString(),
      to: dayjs(date).endOf('week').toISOString(),
    };
  });

  private getKey(from: string, to: string) {
    return `${from}_${to}`;
  }

  constructor() {
    effect(() => {
      const { from, to } = this.range();
      const key = this.getKey(from, to);

      // если есть кеш, не загружаем
      if (this.cache()[key]) return;

      this.loading.update((l) => ({ ...l, [key]: true }));
      this.error.update((e) => ({ ...e, [key]: null }));

      this.transactionService.getTransactions(from, to).subscribe({
        next: (data) => {
          this.cache.update((c) => ({
            ...c,
            [key]: data,
          }));

          this.loading.update((l) => ({ ...l, [key]: false }));
        },
        error: (err) => {
          this.error.update((e) => ({
            ...e,
            [key]: err?.message ?? 'Ошибка загрузки',
          }));

          this.loading.update((l) => ({ ...l, [key]: false }));
        },
      });
    });
  }

  readonly transactions = computed(() => {
    const { from, to } = this.range();
    return this.cache()[this.getKey(from, to)] ?? [];
  });

  readonly isLoading = computed(() => {
    const { from, to } = this.range();
    return this.loading()[this.getKey(from, to)] ?? false;
  });

  readonly errorMessage = computed(() => {
    const { from, to } = this.range();
    return this.error()[this.getKey(from, to)] ?? null;
  });
  
  readonly vm = computed(() => ({
    transactions: this.transactions(),
    loading: this.isLoading(),
    error: this.errorMessage(),
  }));
}
