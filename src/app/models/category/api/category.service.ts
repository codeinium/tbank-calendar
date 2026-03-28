import { Injectable } from '@angular/core';
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
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    if (USE_MOCK) {
      return of(CATEGORIES_MOCK);
    }

    return this.http
      .get<ApiCategory[]>('/')
      .pipe(map((data) => data.map(mapCategory)));
  }
}
