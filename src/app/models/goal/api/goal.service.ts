import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Goal,
  GoalDetails,
  CreateGoalRequest,
  GoalTransactionRequest,
  UpdateGoalAutoPayRequest,
  UpdateGoalRequest,
} from '../model/goal.model';
import {
  ApiGoal,
  ApiGoalDetails,
  ApiCreateGoalRequest,
} from './goal.api';
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

@Injectable({ providedIn: 'root' })
export class GoalsService {
  private readonly apiUrl = '/api/v1';

  private readonly _goals = signal<Goal[]>([]);
  private readonly _selectedGoal = signal<GoalDetails | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly goals = this._goals.asReadonly();
  readonly selectedGoal = this._selectedGoal.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private http: HttpClient) {
    this.loadGoals();
  }

  /* загрузить список целей */
  loadGoals() {
    this._loading.set(true);
    this._error.set(null);

    if (USE_MOCK) {
      setTimeout(() => {
        this._goals.set(MOCK_GOALS);
        this._loading.set(false);
      }, 1000);
      return;
    }

    this.http.get<ApiGoal[]>(`${this.apiUrl}/goals`).subscribe({
      next: (data) => {
        this._goals.set(data.map(mapGoal));
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  /* загрузить детальную информацию о цели по ее id */
  loadGoalDetails(goalId: string) {
    this._loading.set(true);
    this._error.set(null);

    if (USE_MOCK) {
      const mockGoal = getMockGoalDetails(goalId);

      if (!mockGoal) {
        this._error.set(`Goal with id ${goalId} not found`);
        this._loading.set(false);
        return;
      }

      setTimeout(() => {
        this._selectedGoal.set(mockGoal);
        this._loading.set(false);
      }, 3000);

      return;
    }

    this.http.get<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}`).subscribe({
      next: (data) => {
        this._selectedGoal.set(mapGoalDetails(data));
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  /* создать цель */
  createGoal(request: CreateGoalRequest) {
    const apiRequest: ApiCreateGoalRequest = mapCreateGoal(request);

    if (USE_MOCK) {
      const newGoal = createMockGoal(apiRequest);
      this._goals.update((goals) => [...goals, newGoal]);
      this._selectedGoal.set(newGoal);
      return;
    }

    this.http.post<ApiGoalDetails>(`${this.apiUrl}/goals`, apiRequest).subscribe({
      next: (data) => {
        const mapped = mapGoalDetails(data);
        this._goals.update((goals) => [...goals, { ...mapped }]);
        this._selectedGoal.set(mapped);
      },
      error: (err) => {
        this._error.set(err.message);
      },
    });
  }

  /* пополнить */
  depositToGoal(goalId: string, request: GoalTransactionRequest) {
    const apiRequest = mapTransactionGoal(request);

    if (USE_MOCK) {
      const updated = mockDepositToGoal(goalId, apiRequest);
      this._selectedGoal.set(updated);
      this._goals.update((goals) =>
        goals.map((g) =>
          g.id === goalId
            ? { ...g, current_amount: updated.currentAmount, status: updated.status }
            : g,
        ),
      );
      return;
    }

    this.http.post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/deposit`, apiRequest).subscribe({
      next: (data) => {
        const mapped = mapGoalDetails(data);
        this._selectedGoal.set(mapped);
        this._goals.update((goals) =>
          goals.map((g) =>
            g.id === goalId
              ? { ...g, current_amount: mapped.currentAmount, status: mapped.status }
              : g,
          ),
        );
      },
      error: (err) => {
        this._error.set(err.message);
      },
    });
  }

  /* снять */
  withdrawFromGoal(goalId: string, request: GoalTransactionRequest) {
    const apiRequest = mapTransactionGoal(request);

    if (USE_MOCK) {
      const updated = mockWithdrawFromGoal(goalId, apiRequest);
      this._selectedGoal.set(updated);
      this._goals.update((goals) =>
        goals.map((g) =>
          g.id === goalId
            ? { ...g, current_amount: updated.currentAmount, status: updated.status }
            : g,
        ),
      );
      return;
    }

    this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/withdraw`, apiRequest)
      .subscribe({
        next: (data) => {
          const mapped = mapGoalDetails(data);
          this._selectedGoal.set(mapped);
          this._goals.update((goals) =>
            goals.map((g) =>
              g.id === goalId
                ? { ...g, current_amount: mapped.currentAmount, status: mapped.status }
                : g,
            ),
          );
        },
        error: (err) => {
          this._error.set(err.message);
        },
      });
  }

  /* изменение цели (название, дедлайн) */
  updateGoal(goalId: string, request: UpdateGoalRequest) {
    const apiRequest = mapUpdateGoal(request);

    if (USE_MOCK) {
      const updated = mockUpdateGoal(goalId, apiRequest);
      this._selectedGoal.set(updated);
      return;
    }

    this.http
      .patch<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/auto-pay`, apiRequest)
      .subscribe({
        next: (data) => {
          this._selectedGoal.set(mapGoalDetails(data));
        },
        error: (err) => {
          this._error.set(err.message);
        },
      });
  }

  /* изменение цели (автопополнение) */
  updateGoalAutoPay(goalId: string, request: UpdateGoalAutoPayRequest) {
    const apiRequest = mapUpdateGoalAutoPay(request);

    if (USE_MOCK) {
      const updated = mockUpdateGoalAutoPay(goalId, apiRequest);
      this._selectedGoal.set(updated);
      return;
    }

    this.http
      .patch<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/auto-pay`, apiRequest)
      .subscribe({
        next: (data) => {
          this._selectedGoal.set(mapGoalDetails(data));
        },
        error: (err) => {
          this._error.set(err.message);
        },
      });
  }
}
