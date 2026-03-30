import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../model/category.model';
import { CATEGORIES_MOCK } from './category.mock';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiCategory } from './category.api';
import { mapCategory } from './category.mapper';

const USE_MOCK = true;

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly _categories = signal<Category[]>([]);

  readonly categories = this._categories.asReadonly();

  constructor(private http: HttpClient) {
    this.loadCategories();
  }

  loadCategories() {
    if (USE_MOCK) {
      this._categories.set(CATEGORIES_MOCK);
      return;
    }

    this.http
      .get<ApiCategory[]>('/api/categories')
      .pipe(map((data) => data.map(mapCategory)))
      .subscribe((data) => {
        this._categories.set(data);
      });
  }
}