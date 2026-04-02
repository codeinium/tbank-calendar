import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {
  Goal,
  GoalDetails,
  CreateGoalRequest,
  GoalTransactionRequest,
  UpdateGoalAutoPayRequest,
} from '../model/goal.model';
import {
  ApiGoal,
  ApiGoalDetails,
  ApiCreateGoalRequest,
  ApiGoalTransactionRequest,
  ApiUpdateGoalAutoPayRequest,
} from './goal.api';
import { mapGoal, mapGoalDetails } from './goal.mapper';

const USE_MOCK = true;

@Injectable({ providedIn: 'root' })
export class GoalsService {
  private readonly apiUrl = '/api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Получить все цели (краткий список)
   * GET /api/v1/goals
   */
  getGoals(): Observable<Goal[]> {
    if (USE_MOCK) {
      return of(this.getMockGoals());
    }

    return this.http
      .get<ApiGoal[]>(`${this.apiUrl}/goals`)
      .pipe(map((data) => data.map(mapGoal)));
  }

  /**
   * Получить детальную информацию о цели
   * GET /api/v1/goals/{goalId}
   */
  getGoalDetails(goalId: string): Observable<GoalDetails> {
    if (USE_MOCK) {
      const mockGoal = this.getMockGoalDetails(goalId);
      if (!mockGoal) {
        throw new Error(`Goal with id ${goalId} not found`);
      }
      return of(mockGoal);
    }

    return this.http
      .get<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}`)
      .pipe(map(mapGoalDetails));
  }

  /**
   * Создать цель
   * POST /api/v1/goals
   */
  createGoal(request: CreateGoalRequest): Observable<GoalDetails> {
    const apiRequest: ApiCreateGoalRequest = {
      name: request.name,
      target_amount: request.target_amount,
      deadline: request.deadline,
      hard_mode: request.hard_mode,
      auto_pay: request.auto_pay,
      account_id: request.account_id,
      billing_cycle: request.billing_cycle,
      billing_interval: request.billing_interval,
      auto_pay_amount: request.auto_pay_amount,
    };

    if (USE_MOCK) {
      return of(this.createMockGoal(apiRequest));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /**
   * Пополнить цель
   * POST /api/v1/goals/{goalId}/deposit
   */
  depositToGoal(goalId: string, request: GoalTransactionRequest): Observable<GoalDetails> {
    const apiRequest: ApiGoalTransactionRequest = {
      amount: request.amount,
      account_id: request.account_id,
    };

    if (USE_MOCK) {
      return of(this.mockDepositToGoal(goalId, apiRequest));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/deposit`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /**
   * Снять с цели
   * POST /api/v1/goals/{goalId}/withdraw
   */
  withdrawFromGoal(goalId: string, request: GoalTransactionRequest): Observable<GoalDetails> {
    const apiRequest: ApiGoalTransactionRequest = {
      amount: request.amount,
      account_id: request.account_id,
    };

    if (USE_MOCK) {
      return of(this.mockWithdrawFromGoal(goalId, apiRequest));
    }

    return this.http
      .post<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/withdraw`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  /**
   * Изменить настройки автопополнения
   * PATCH /api/v1/goals/{goalId}/auto-pay
   */
  updateGoalAutoPay(
    goalId: string,
    request: UpdateGoalAutoPayRequest,
  ): Observable<GoalDetails> {
    const apiRequest: ApiUpdateGoalAutoPayRequest = {
      goal_id: request.goal_id,
      is_active: request.is_active,
      account_id: request.account_id,
      billing_cycle: request.billing_cycle,
      billing_interval: request.billing_interval,
      amount: request.amount,
    };

    if (USE_MOCK) {
      return of(this.mockUpdateGoalAutoPay(goalId, apiRequest));
    }

    return this.http
      .patch<ApiGoalDetails>(`${this.apiUrl}/goals/${goalId}/auto-pay`, apiRequest)
      .pipe(map(mapGoalDetails));
  }

  // ========== Mock данные ==========

  private getMockGoals(): Goal[] {
    return [
      {
        id: 'goal-1',
        name: 'На отпуск',
        target_amount: 150000,
        current_amount: 75000,
        status: 'active',
      },
      {
        id: 'goal-2',
        name: 'Новый ноутбук',
        target_amount: 200000,
        current_amount: 50000,
        status: 'active',
      },
      {
        id: 'goal-3',
        name: 'Подушка безопасности',
        target_amount: 500000,
        current_amount: 500000,
        status: 'achieved',
      },
    ];
  }

  private getMockGoalDetails(goalId: string): GoalDetails | null {
    const goals: Record<string, GoalDetails> = {
      'goal-1': {
        id: 'goal-1',
        account_id: 'acc-1',
        name: 'На отпуск',
        target_amount: 150000,
        current_amount: 75000,
        deadline: '2026-08-01',
        achieved_at: null,
        hard_mode: false,
        status: 'active',
        auto_pay: true,
      },
      'goal-2': {
        id: 'goal-2',
        account_id: 'acc-2',
        name: 'Новый ноутбук',
        target_amount: 200000,
        current_amount: 50000,
        deadline: '2026-12-01',
        achieved_at: null,
        hard_mode: true,
        status: 'active',
        auto_pay: false,
      },
      'goal-3': {
        id: 'goal-3',
        account_id: 'acc-3',
        name: 'Подушка безопасности',
        target_amount: 500000,
        current_amount: 500000,
        deadline: null,
        achieved_at: '2026-03-15T10:30:00Z',
        hard_mode: false,
        status: 'achieved',
        auto_pay: false,
      },
    };

    return goals[goalId] || null;
  }

  private createMockGoal(request: ApiCreateGoalRequest): GoalDetails {
    return {
      id: `goal-${Date.now()}`,
      account_id: request.account_id ?? `acc-${Date.now()}`,
      name: request.name,
      target_amount: request.target_amount,
      current_amount: 0,
      deadline: request.deadline ?? null,
      achieved_at: null,
      hard_mode: request.hard_mode ?? false,
      status: 'active',
      auto_pay: request.auto_pay ?? false,
    };
  }

  private mockDepositToGoal(goalId: string, request: ApiGoalTransactionRequest): GoalDetails {
    const goal = this.getMockGoalDetails(goalId);
    if (!goal) {
      throw new Error(`Goal with id ${goalId} not found`);
    }

    return {
      ...goal,
      current_amount: goal.current_amount + request.amount,
      status:
        goal.current_amount + request.amount >= goal.target_amount ? 'achieved' : goal.status,
      achieved_at:
        goal.current_amount + request.amount >= goal.target_amount
          ? new Date().toISOString()
          : goal.achieved_at,
    };
  }

  private mockWithdrawFromGoal(goalId: string, request: ApiGoalTransactionRequest): GoalDetails {
    const goal = this.getMockGoalDetails(goalId);
    if (!goal) {
      throw new Error(`Goal with id ${goalId} not found`);
    }

    const newAmount = Math.max(0, goal.current_amount - request.amount);

    return {
      ...goal,
      current_amount: newAmount,
      status: newAmount >= goal.target_amount ? 'achieved' : 'active',
      achieved_at: newAmount >= goal.target_amount ? new Date().toISOString() : null,
    };
  }

  private mockUpdateGoalAutoPay(
    goalId: string,
    request: ApiUpdateGoalAutoPayRequest,
  ): GoalDetails {
    const goal = this.getMockGoalDetails(goalId);
    if (!goal) {
      throw new Error(`Goal with id ${goalId} not found`);
    }

    return {
      ...goal,
      auto_pay: request.is_active,
      account_id: request.account_id ?? goal.account_id,
    };
  }
}
