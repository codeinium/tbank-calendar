import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map, of } from 'rxjs';

import { environment } from '@/environments/environment';

import { PlannedCalendarPayment } from '@/app/models/planned-calendar-item/planned-calendar-item.model';

import { ApiPlannedCalendarPaymentsResponse } from './planned-calendar-item.api';

import { mapPlannedCalendarPayment } from './planned-calendar-item.mapper';
import { PLANNED_CALENDAR_PAYMENTS_MOCK } from './planned-calendar-item.mock';

@Injectable({ providedIn: 'root' })
export class PlannedCalendarPaymentService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;

  constructor(private readonly http: HttpClient) {}

  getPlannedPayments(from: string, to: string): Observable<PlannedCalendarPayment[]> {
    if (this.useMock) {
      const filtered = PLANNED_CALENDAR_PAYMENTS_MOCK.filter((item) => {
        return item.plannedDate >= from && item.plannedDate <= to;
      });

      return of(filtered).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiPlannedCalendarPaymentsResponse>(`${this.apiUrl}/calendar/planned-payments`, {
        params: {
          dateFrom: from,
          dateTo: to,
        },
      })
      .pipe(map((response) => response.items.map(mapPlannedCalendarPayment)));
  }
}
