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
} from '../../models/goal/goal.model';

import { ApiGoal, ApiGoalDetails } from './goal.api';

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
  MOCK_GOAL_ACCOUNTS,
} from './goal.mock';

import { ApiGoalAccount } from './goal.api';
import { GoalAccount } from '../../models/goal/goal.model';
import { mapGoalAccount } from './goal.mapper';

@Injectable({ providedIn: 'root' })
export class GoalsService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;

  constructor(private http: HttpClient) {}

  getGoals(): Observable<Goal[]> {
    if (this.useMock) {
      return of(MOCK_GOALS).pipe(delay(this.mockDelay));
    }

    return this.http.get<ApiGoal[]>(`${this.apiUrl}/goals`).pipe(map((data) => data.map(mapGoal)));
  }

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

  createGoal(request: CreateGoalRequest): Observable<GoalDetails> {
    const apiRequest = mapCreateGoal(request);

    if (this.useMock) {
      return of(createMockGoal(apiRequest)).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  contribute(goalId: string, request: GoalTransactionRequest): Observable<GoalDetails> {
    const apiRequest = mapTransactionGoal(request);

    if (this.useMock) {
      return of(mockDepositToGoal(goalId, apiRequest)).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/contribute`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  withdraw(goalId: string, request: GoalTransactionRequest): Observable<GoalDetails> {
    const apiRequest = mapTransactionGoal(request);

    if (this.useMock) {
      return of(mockWithdrawFromGoal(goalId, apiRequest)).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/withdraw`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  updateGoal(goalId: string, request: UpdateGoalRequest): Observable<GoalDetails> {
    const apiRequest = mapUpdateGoal(request);

    if (this.useMock) {
      return of(mockUpdateGoal(goalId, apiRequest)).pipe(delay(this.mockDelay));
    }

    return this.http
      .patch<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  updateGoalAutoPay(goalId: string, request: UpdateGoalAutoPayRequest): Observable<GoalDetails> {
    const apiRequest = mapUpdateGoalAutoPay(request);

    if (this.useMock) {
      return of(mockUpdateGoalAutoPay(goalId, apiRequest)).pipe(delay(this.mockDelay));
    }

    return this.http
      .patch<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  getGoalAccounts(customerId: string): Observable<GoalAccount[]> {
    if (this.useMock) {
      return of(MOCK_GOAL_ACCOUNTS).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiGoalAccount[]>(`${this.apiUrl}/goals/accounts`, {
        params: {
          customer_id: customerId,
        },
      })
      .pipe(map((data) => data.map(mapGoalAccount)));
  }

  cancelGoal(goalId: string): Observable<void> {
    if (this.useMock) {
      return of(void 0).pipe(delay(this.mockDelay));
    }

    return this.http.delete<void>(`${this.apiUrl}/goals/${goalId}`);
  }
}
