import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, map } from 'rxjs';
import { environment } from '@/environments/environment';
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


@Injectable({ providedIn: 'root' })
export class GoalsService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;

  constructor(private http: HttpClient) {}

  /* список целей */
  getGoals(): Observable<Goal[]> {
    if (this.useMock) {
      return of(MOCK_GOALS).pipe(delay(this.mockDelay));
    }

    return this.http.get<ApiGoal[]>(`${this.apiUrl}/goals`).pipe(map((data) => data.map(mapGoal)));
  }

  /* детали цели */
  getGoalDetails(goalId: string): Observable<GoalDetails> {
    if (this.useMock) {
      const goal = getMockGoalDetails(goalId);
      if (!goal) throw new Error('Goal not found');

      return of(goal).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}`)
      .pipe(map(mapGoalDetails));
  }

  /* создать */
  createGoal(request: CreateGoalRequest): Observable<GoalDetails> {
    const apiRequest: ApiCreateGoalRequest = mapCreateGoal(request);

    if (this.useMock) {
      const created = createMockGoal(apiRequest);
      return of(created).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /* пополнение */
  deposit(goalId: string, request: GoalTransactionRequest): Observable<GoalDetails> {
    const apiRequest = mapTransactionGoal(request);

    if (this.useMock) {
      const updated = mockDepositToGoal(goalId, apiRequest);
      return of(updated).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/deposit`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /* снятие */
  withdraw(goalId: string, request: GoalTransactionRequest): Observable<GoalDetails> {
    const apiRequest = mapTransactionGoal(request);

    if (this.useMock) {
      const updated = mockWithdrawFromGoal(goalId, apiRequest);
      return of(updated).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/withdraw`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /* update */
  updateGoal(goalId: string, request: UpdateGoalRequest): Observable<GoalDetails> {
    const apiRequest = mapUpdateGoal(request);

    if (this.useMock) {
      const updated = mockUpdateGoal(goalId, apiRequest);
      return of(updated).pipe(delay(this.mockDelay));
    }

    return this.http
      .patch<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /* auto-pay */
  updateGoalAutoPay(goalId: string, request: UpdateGoalAutoPayRequest): Observable<GoalDetails> {
    const apiRequest = mapUpdateGoalAutoPay(request);

    if (this.useMock) {
      const updated = mockUpdateGoalAutoPay(goalId, apiRequest);
      return of(updated).pipe(delay(this.mockDelay));
    }

    return this.http
      .patch<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/auto-pay`, apiRequest)
      .pipe(map(mapGoalDetails));
  }
}
