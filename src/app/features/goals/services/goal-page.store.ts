import { Injectable, signal } from '@angular/core';
import { GoalsService } from '@/app/services/goal/goal.service';
import {
  Goal,
  GoalDetails,
  CreateGoalRequest,
  GoalTransactionRequest,
  UpdateGoalRequest,
  UpdateGoalAutoPayRequest,
  GoalAccount,
} from '@/app/models/goal/goal.model';
import { take } from 'rxjs';
import { Transaction } from '@/app/models/transaction/transaction.model';

@Injectable({ providedIn: 'root' })
export class GoalsPageStore {
  private readonly _goals = signal<Goal[]>([]);
  private readonly _selectedGoal = signal<GoalDetails | null>(null);
  private readonly _transactions = signal<Transaction[]>([]);
  private readonly _accounts = signal<GoalAccount[]>([]);

  private readonly _loadingList = signal(false);
  private readonly _loadingSelectedGoal = signal(false);
  private readonly _loadingTransactions = signal(false);
  private readonly _loadingAccounts = signal(false);

  private readonly _error = signal<string | null>(null);

  readonly goals = this._goals.asReadonly();
  readonly selectedGoal = this._selectedGoal.asReadonly();
  readonly transactions = this._transactions.asReadonly();
  readonly accounts = this._accounts.asReadonly();

  readonly loadingList = this._loadingList.asReadonly();
  readonly loadingSelectedGoal = this._loadingSelectedGoal.asReadonly();
  readonly loadingTransactions = this._loadingTransactions.asReadonly();
  readonly loadingAccounts = this._loadingAccounts.asReadonly();

  readonly error = this._error.asReadonly();

  constructor(private goalsService: GoalsService) {}

  loadGoals() {
    this._loadingList.set(true);
    this._error.set(null);

    this.goalsService
      .getGoals()
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

  selectGoal(goalId: string) {
    this._loadingSelectedGoal.set(true);
    this._loadingTransactions.set(true);
    this._error.set(null);

    this.goalsService
      .getGoalDetails(goalId)
      .pipe(take(1))
      .subscribe({
        next: (goal) => {
          this._selectedGoal.set(goal);
          this._transactions.set(goal.transactions ?? []);

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

  loadAccounts(customerId: string) {
    this._loadingAccounts.set(true);
    this._error.set(null);

    this.goalsService
      .getGoalAccounts(customerId)
      .pipe(take(1))
      .subscribe({
        next: (accounts) => {
          this._accounts.set(accounts);
          this._loadingAccounts.set(false);
        },
        error: (err) => {
          this._error.set(err.message);
          this._loadingAccounts.set(false);
        },
      });
  }

  createGoal(request: CreateGoalRequest) {
    this._error.set(null);

    this.goalsService
      .createGoal(request)
      .pipe(take(1))
      .subscribe({
        next: (goal) => {
          this._goals.update((goals) => [...goals, this.toGoal(goal)]);
          this._selectedGoal.set(goal);
          this._transactions.set(goal.transactions ?? []);
        },
        error: (err) => this._error.set(err.message),
      });
  }

  contribute(goalId: string, request: GoalTransactionRequest) {
    this._error.set(null);

    this.goalsService
      .contribute(goalId, request)
      .pipe(take(1))
      .subscribe({
        next: (updated) => {
          this.updateSelectedGoal(updated);
          this.updateGoalInList(updated);
        },
        error: (err) => this._error.set(err.message),
      });
  }

  withdraw(goalId: string, request: GoalTransactionRequest) {
    this._error.set(null);

    this.goalsService
      .withdraw(goalId, request)
      .pipe(take(1))
      .subscribe({
        next: (updated) => {
          this.updateSelectedGoal(updated);
          this.updateGoalInList(updated);
        },
        error: (err) => this._error.set(err.message),
      });
  }

  updateGoal(goalId: string, request: UpdateGoalRequest) {
    this._error.set(null);

    this.goalsService
      .updateGoal(goalId, request)
      .pipe(take(1))
      .subscribe({
        next: (updated) => {
          this.updateSelectedGoal(updated);
          this.updateGoalInList(updated);
        },
        error: (err) => this._error.set(err.message),
      });
  }

  updateGoalAutoPay(goalId: string, request: UpdateGoalAutoPayRequest) {
    this._error.set(null);

    this.goalsService
      .updateGoalAutoPay(goalId, request)
      .pipe(take(1))
      .subscribe({
        next: (updated) => {
          this.updateSelectedGoal(updated);
          this.updateGoalInList(updated);
        },
        error: (err) => this._error.set(err.message),
      });
  }

  cancelGoal(goalId: string) {
    this._error.set(null);

    this.goalsService
      .cancelGoal(goalId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._goals.update((goals) => goals.filter((goal) => goal.id !== goalId));

          const selectedGoal = this._selectedGoal();

          if (selectedGoal?.id === goalId) {
            this.resetSelection();
          }
        },
        error: (err) => this._error.set(err.message),
      });
  }

  resetSelection() {
    this._selectedGoal.set(null);
    this._transactions.set([]);
  }

  private updateSelectedGoal(goal: GoalDetails) {
    this._selectedGoal.set(goal);
    this._transactions.set(goal.transactions ?? []);
  }

  private updateGoalInList(updated: GoalDetails) {
    this._goals.update((goals) =>
      goals.map((goal) => (goal.id === updated.id ? this.toGoal(updated) : goal)),
    );
  }

  private toGoal(goal: GoalDetails): Goal {
    return {
      id: goal.id,
      name: goal.name,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      status: goal.status,
    };
  }
}
