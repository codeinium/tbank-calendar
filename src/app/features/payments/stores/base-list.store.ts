import { computed, signal } from '@angular/core';

export abstract class BaseListStore<T> {
  protected readonly _items = signal<T[]>([]);
  protected readonly _loading = signal(false);
  protected readonly _error = signal<string | null>(null);

  readonly items = this._items.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  protected search = signal('');
  protected sortBy = signal<string>('date');
  protected sortDir = signal<'asc' | 'desc'>('asc');

  setSearch(value: string) {
    this.search.set(value);
  }

  setSortBy(value: string) {
    this.sortBy.set(value);
  }

  setSortDir(value: 'asc' | 'desc') {
    this.sortDir.set(value);
  }

  protected abstract filterFn(item: T, search: string): boolean;
  protected abstract sortFn(a: T, b: T, sortBy: string): number;

  readonly filtered = computed(() => {
    const search = this.search();

    return this.items().filter((item) => this.filterFn(item, search));
  });

  readonly sorted = computed(() => {
    const data = this.filtered();
    const sortBy = this.sortBy();
    const dir = this.sortDir();

    return [...data].sort((a, b) => {
      const res = this.sortFn(a, b, sortBy);
      return dir === 'asc' ? res : -res;
    });
  });
}
