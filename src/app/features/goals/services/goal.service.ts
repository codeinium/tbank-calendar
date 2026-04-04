// goals-page.store.ts
import { Injectable, signal } from '@angular/core';
import { GoalsService } from '@/app/models/goal/api/goal.service';

import {
  Goal,
  GoalDetails,
  CreateGoalRequest,
  GoalTransactionRequest,
  UpdateGoalRequest,
  UpdateGoalAutoPayRequest,
} from '@/app/models/goal/model/goal.model';

@Injectable({ providedIn: 'root' })
export class GoalsPageStore {
  private readonly _goals = signal<Goal[]>([]);
  private readonly _selectedGoal = signal<GoalDetails | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly goals = this._goals.asReadonly();
  readonly selectedGoal = this._selectedGoal.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private goalsService: GoalsService) {}

  /* загрузка списка */
  loadGoals() {
    this._loading.set(true);
    this._error.set(null);

    this.goalsService.getGoals().subscribe({
      next: (goals) => {
        this._goals.set(goals);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  /* выбор цели */
  selectGoal(goalId: string) {
    this._loading.set(true);
    this._error.set(null);

    this.goalsService.getGoalDetails(goalId).subscribe({
      next: (goal) => {
        this._selectedGoal.set(goal);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  /* создать */
  createGoal(request: CreateGoalRequest) {
    this.goalsService.createGoal(request).subscribe({
      next: (goal) => {
        this._goals.update((g) => [...g, goal]);
        this._selectedGoal.set(goal);
      },
      error: (err) => this._error.set(err.message),
    });
  }

  /* пополнение */
  deposit(goalId: string, request: GoalTransactionRequest) {
    this.goalsService.deposit(goalId, request).subscribe({
      next: (updated) => {
        this._selectedGoal.set(updated);

        this._goals.update((goals) =>
          goals.map((g) =>
            g.id === goalId
              ? {
                  ...g,
                  currentAmount: updated.currentAmount,
                  status: updated.status,
                }
              : g,
          ),
        );
      },
    });
  }

  /* снятие */
  withdraw(goalId: string, request: GoalTransactionRequest) {
    this.goalsService.withdraw(goalId, request).subscribe({
      next: (updated) => {
        this._selectedGoal.set(updated);

        this._goals.update((goals) =>
          goals.map((g) =>
            g.id === goalId
              ? {
                  ...g,
                  currentAmount: updated.currentAmount,
                  status: updated.status,
                }
              : g,
          ),
        );
      },
    });
  }

  /* обновление */
  updateGoal(goalId: string, request: UpdateGoalRequest) {
    this.goalsService.updateGoal(goalId, request).subscribe({
      next: (updated) => {
        this._selectedGoal.set(updated);
      },
    });
  }

  /* auto-pay */
  updateGoalAutoPay(goalId: string, request: UpdateGoalAutoPayRequest) {
    this.goalsService.updateGoalAutoPay(goalId, request).subscribe({
      next: (updated) => {
        this._selectedGoal.set(updated);
      },
    });
  }
}
