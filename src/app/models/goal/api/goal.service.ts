// goals.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, map } from 'rxjs';

import {
  Goal,
  GoalDetails,
  CreateGoalRequest,
  GoalTransactionRequest,
  UpdateGoalAutoPayRequest,
  UpdateGoalRequest,
} from '../model/goal.model';

import { ApiGoal, ApiGoalDetails, ApiCreateGoalRequest } from './goal.api';

import {
  mapCreateGoal,
  mapGoal,
  mapGoalDetails,
  mapTransactionGoal,
  mapUpdateGoal,
  mapUpdateGoalAutoPay,
} from './goal.mapper';

import {
  MOCK_GOALS,
  getMockGoalDetails,
  createMockGoal,
  mockDepositToGoal,
  mockWithdrawFromGoal,
  mockUpdateGoalAutoPay,
  mockUpdateGoal,
} from './goal.mock';

const USE_MOCK = true;
const MOCK_DELAY = 800;

@Injectable({ providedIn: 'root' })
export class GoalsService {
  private readonly apiUrl = '/api/v1';

  constructor(private http: HttpClient) {}

  /* список целей */
  getGoals(): Observable<Goal[]> {
    if (USE_MOCK) {
      return of(MOCK_GOALS).pipe(delay(MOCK_DELAY));
    }

    return this.http.get<ApiGoal[]>(`${this.apiUrl}/goals`).pipe(map((data) => data.map(mapGoal)));
  }

  /* детали цели */
  getGoalDetails(goalId: string): Observable<GoalDetails> {
    if (USE_MOCK) {
      const goal = getMockGoalDetails(goalId);
      if (!goal) throw new Error('Goal not found');

      return of(goal).pipe(delay(MOCK_DELAY));
    }

    return this.http
      .get<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}`)
      .pipe(map(mapGoalDetails));
  }

  /* создать */
  createGoal(request: CreateGoalRequest): Observable<GoalDetails> {
    const apiRequest: ApiCreateGoalRequest = mapCreateGoal(request);

    if (USE_MOCK) {
      const created = createMockGoal(apiRequest);
      return of(created).pipe(delay(MOCK_DELAY));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /* пополнение */
  deposit(goalId: string, request: GoalTransactionRequest): Observable<GoalDetails> {
    const apiRequest = mapTransactionGoal(request);

    if (USE_MOCK) {
      const updated = mockDepositToGoal(goalId, apiRequest);
      return of(updated).pipe(delay(MOCK_DELAY));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/deposit`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /* снятие */
  withdraw(goalId: string, request: GoalTransactionRequest): Observable<GoalDetails> {
    const apiRequest = mapTransactionGoal(request);

    if (USE_MOCK) {
      const updated = mockWithdrawFromGoal(goalId, apiRequest);
      return of(updated).pipe(delay(MOCK_DELAY));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/withdraw`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /* update */
  updateGoal(goalId: string, request: UpdateGoalRequest): Observable<GoalDetails> {
    const apiRequest = mapUpdateGoal(request);

    if (USE_MOCK) {
      const updated = mockUpdateGoal(goalId, apiRequest);
      return of(updated).pipe(delay(MOCK_DELAY));
    }

    return this.http
      .patch<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /* auto-pay */
  updateGoalAutoPay(goalId: string, request: UpdateGoalAutoPayRequest): Observable<GoalDetails> {
    const apiRequest = mapUpdateGoalAutoPay(request);

    if (USE_MOCK) {
      const updated = mockUpdateGoalAutoPay(goalId, apiRequest);
      return of(updated).pipe(delay(MOCK_DELAY));
    }

    return this.http
      .patch<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/auto-pay`, apiRequest)
      .pipe(map(mapGoalDetails));
  }
}
