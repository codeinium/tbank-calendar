import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiCategory } from './category.api';
import { Category } from '@/app/models/category/category.model';
import { CategoriesService } from './category.service';

export interface CategoryOption {
  value: string;
  label: string;
  color: string;
  mccCode: number;
}

@Injectable({ providedIn: 'root' })
export class CategoriesStore {
  private readonly service = inject(CategoriesService);

  private readonly _categories = signal<Category[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _loadedAt = signal<number | null>(null);

  readonly categories = this._categories.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly categoryOptions = computed<CategoryOption[]>(() =>
    this._categories().map((category) => ({
      value: category.name,
      label: category.name,
      color: category.color,
      mccCode: category.mccCode,
    })),
  );

  loadCategories(force = false) {
    if (!force && !this.shouldReload()) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    this.service.getCategories().subscribe({
      next: (categories) => {
        this._categories.set(categories);
        this._loadedAt.set(Date.now());
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Не удалось загрузить категории');
        this._loading.set(false);
      },
    });
  }

  private shouldReload(): boolean {
    const loadedAt = this._loadedAt();
    if (!loadedAt) {
      return true;
    }
    const oneDay = 24 * 60 * 60 * 1000;
    return Date.now() - loadedAt > oneDay;
  }
}
