import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { TransactionService } from '@/app/services/transaction/transaction.service';
import { CalendarService } from './calendar.service';
import { Transaction } from '@/app/models/transaction/transaction.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';

@Injectable()
export class CalendarPageStore {
  private transactionService = inject(TransactionService);
  private calendar = inject(CalendarService);

  private readonly currentCache = signal<{ key: string; data: Transaction[] } | null>(null);
  private readonly previousCache = signal<{ key: string; data: Transaction[] } | null>(null);
  private readonly loading = signal<boolean>(false);
  private readonly error = signal<string | null>(null);

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
      const current = this.currentCache();
      const previous = this.previousCache();

      // 1. период не изменился — ничего не делаем
      if (current?.key === key) {
        this.error.set(null);
        return;
      }

      // 2. пользователь вернулся к предыдущему периоду — восстанавливаем из кэша
      //    меняем местами: предыдущий становится текущим, текущий — предыдущим
      if (previous?.key === key) {
        this.currentCache.set(previous);
        this.previousCache.set(current);
        this.loading.set(false);
        this.error.set(null);
        return;
      }

      // 3. новый период: сохраняем текущий как предыдущий, загружаем данные
      if (current) {
        this.previousCache.set(current);
      }

      this.loading.set(true);
      this.error.set(null);

      this.transactionService.getTransactions(from, to).subscribe({
        next: (data) => {
          this.currentCache.set({ key, data });
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.message ?? 'Ошибка загрузки');
          this.loading.set(false);
        },
      });
    });
  }

  readonly transactions = computed(() => {
    const { from, to } = this.range();
    const key = this.getKey(from, to);
    const current = this.currentCache();

    return current?.key === key ? current.data : [];
  });

  readonly isLoading = computed(() => this.loading());

  readonly errorMessage = computed(() => this.error());

  readonly vm = computed(() => ({
    transactions: this.transactions(),
    loading: this.isLoading(),
    error: this.errorMessage(),
  }));
}
