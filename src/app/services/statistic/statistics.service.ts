import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of } from 'rxjs';

import { environment } from '@/environments/environment';

import { StatisticsDashboard } from '@/app/models/statistic/statistics.model';

import { StatisticsPeriod } from '@/app/shared/types/statistics-period.type';

import { ApiStatisticsDashboard } from './statistics.api';
import { mapStatisticsDashboard } from './statistics.mapper';
import { MOCK_STATISTICS_DASHBOARD } from './statistics.mock';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;

  constructor(private http: HttpClient) {}

  getDashboard(period: StatisticsPeriod, date: string): Observable<StatisticsDashboard> {
    if (this.useMock) {
      return of(MOCK_STATISTICS_DASHBOARD).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiStatisticsDashboard>(`${this.apiUrl}/statistics/dashboard`, {
        params: {
          period,
          date,
        },
      })
      .pipe(map(mapStatisticsDashboard));
  }
}
