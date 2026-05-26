import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, of } from 'rxjs';
import { environment } from '@/environments/environment';

import { MOCK_CATEGORY } from './category.mock';
import { ApiCategory } from './category.api';
import { mapGoalDetails } from './category.mapper';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;
  private readonly http = inject(HttpClient);

  getCategories() {
    if (this.useMock) {
          return of(MOCK_CATEGORY).pipe(delay(this.mockDelay));
    }
    return this.http
      .get<ApiCategory[]>('/api/v1/mcc-categories')
      .pipe(map((categories) => categories.map(mapGoalDetails)));
  }
}
