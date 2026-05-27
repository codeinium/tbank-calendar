import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, delay, map, throwError } from 'rxjs';
import { environment } from '@/environments/environment';
import {
  Goal,
  GoalDetails,
  CreateGoalRequest,
  UpdateGoalAutoPayRequest,
  UpdateGoalRequest,
  GoalContributeRequest,
  GoalWithdrawRequest,
} from '../../models/goal/goal.model';

import { ApiGoal, ApiGoalDetails } from './goal.api';

import {
  mapContributeGoal,
  mapCreateGoal,
  mapGoal,
  mapGoalDetails,
  mapUpdateGoal,
  mapUpdateGoalAutoPay,
  mapWithdrawGoal,
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

import { Account } from '@/app/models/user/user.model';
import { ApiAccountMeResponse } from '../user/user.api';
import { mapAccount } from '../user/user.mapper';

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

  contribute(goalId: string, request: GoalContributeRequest): Observable<GoalDetails> {
    const apiRequest = mapContributeGoal(request);

    if (this.useMock) {
      return of(mockDepositToGoal(goalId, apiRequest)).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/contribute`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  withdraw(goalId: string, request: GoalWithdrawRequest): Observable<GoalDetails> {
    const apiRequest = mapWithdrawGoal(request);

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
      // return throwError(
      //   () =>
      //     new HttpErrorResponse({
      //       status: 400,
      //       statusText: 'Bad Request',
      //       error: {
      //         message: 'Недопустимое значение',
      //         errors: {
      //           name: 'Имя не может содержать нецензурную брань',
      //         },
      //       },
      //     }),
      // ).pipe(delay(100000));
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

  getGoalAccounts(): Observable<Account[]> {
    if (this.useMock) {
      return of(MOCK_GOAL_ACCOUNTS).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiAccountMeResponse[]>(`${this.apiUrl}/goals/accounts`)
      .pipe(map((data) => data.map(mapAccount)));
  }

  cancelGoal(goalId: string): Observable<void> {
    if (this.useMock) {
      return of(void 0).pipe(delay(this.mockDelay));
    }

    return this.http.delete<void>(`${this.apiUrl}/goals/${goalId}`);
  }
}
