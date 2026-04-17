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
import { forkJoin, take } from 'rxjs';
import { Transaction } from '@/app/models/transaction/model/transaction.model';

@Injectable({ providedIn: 'root' })
export class GoalsPageStore {
  private readonly _goals = signal<Goal[]>([]);
  private readonly _selectedGoal = signal<GoalDetails | null>(null);
  private readonly _loadingList = signal(false);
  private readonly _loadingSelectedGoal = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _transactions = signal<Transaction[]>([]);
  private readonly _loadingTransactions = signal(false);

  readonly goals = this._goals.asReadonly();
  readonly selectedGoal = this._selectedGoal.asReadonly();
  readonly loadingList = this._loadingList.asReadonly();
  readonly loadingSelectedGoal = this._loadingSelectedGoal.asReadonly();
  readonly error = this._error.asReadonly();
  readonly transactions = this._transactions.asReadonly();
  readonly loadingTransactions = this._loadingTransactions.asReadonly();

  constructor(private goalsService: GoalsService) {}

  /* загрузка списка */
  loadGoals() {
    this._loadingList.set(true);
    this._error.set(null);

    this.goalsService.getGoals()
      .pipe(take(1))
      .subscribe({
        next: (goals) => {
          this._goals.set(goals);
          this._loadingList.set(false);
        },
        error: (err) => {
          this._error.set(err.message);
          this._loadingList.set(false);
        },
      });
  }

  /* выбор цели */
  selectGoal(goalId: string) {
    this._loadingSelectedGoal.set(true);
    this._loadingTransactions.set(true);
    this._error.set(null);

    forkJoin({
      goal: this.goalsService.getGoalDetails(goalId),
      transactions: this.goalsService.getGoalTransactions(goalId),
    })
      .pipe(take(1))
      .subscribe({
        next: ({ goal, transactions }) => {
          this._selectedGoal.set(goal);
          this._transactions.set(transactions);

          this._loadingSelectedGoal.set(false);
          this._loadingTransactions.set(false);
        },
        error: (err) => {
          this._error.set(err.message);
          this._loadingSelectedGoal.set(false);
          this._loadingTransactions.set(false);
        },
      });
  }

  loadTransactions(goalId: string, from?: string, to?: string) {
    this._loadingTransactions.set(true);
    this._error.set(null);

    this.goalsService
      .getGoalTransactions(goalId, from, to)
      .pipe(take(1))
      .subscribe({
        next: (transactions) => {
          this._transactions.set(transactions);
          this._loadingTransactions.set(false);
        },
        error: (err) => {
          this._error.set(err.message);
          this._loadingTransactions.set(false);
        },
      });
  }

  /* создать */
  createGoal(request: CreateGoalRequest) {
    this.goalsService.createGoal(request)
      .pipe(take(1))
      .subscribe({
        next: (goal) => {
          this._goals.update((g) => [...g, goal]);
          this._selectedGoal.set(goal);
        },
        error: (err) => this._error.set(err.message),
      });
  }

  /* пополнение */
  deposit(goalId: string, request: GoalTransactionRequest) {
    this.goalsService
      .deposit(goalId, request)
      .pipe(take(1))
      .subscribe({
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
        error: (err) => this._error.set(err.message),
      });
  }

  /* снятие */
  withdraw(goalId: string, request: GoalTransactionRequest) {
    this.goalsService
      .withdraw(goalId, request)
      .pipe(take(1))
      .subscribe({
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
        error: (err) => this._error.set(err.message),
      });
  }

  /* обновление */
  updateGoal(goalId: string, request: UpdateGoalRequest) {
    this.goalsService
      .updateGoal(goalId, request)
      .pipe(take(1))
      .subscribe({
        next: (updated) => {
          this._selectedGoal.set(updated);
        },
        error: (err) => this._error.set(err.message),
      });
  }

  /* auto-pay */
  updateGoalAutoPay(goalId: string, request: UpdateGoalAutoPayRequest) {
    this.goalsService
      .updateGoalAutoPay(goalId, request)
      .pipe(take(1))
      .subscribe({
        next: (updated) => {
          this._selectedGoal.set(updated);
        },
        error: (err) => this._error.set(err.message),
      });
  }
}
