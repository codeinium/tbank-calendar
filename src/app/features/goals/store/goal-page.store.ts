import { Injectable, signal } from '@angular/core';
import { Goal, GoalDetails } from '@/app/models/goal/goal.model';
import { Transaction } from '@/app/models/transaction/transaction.model';
import { Account } from '@/app/models/user/user.model';

@Injectable()
export class GoalsPageStore {
  private readonly _goals = signal<Goal[]>([]);
  private readonly _selectedGoal = signal<GoalDetails | null>(null);
  private readonly _transactions = signal<Transaction[]>([]);
  private readonly _accounts = signal<Account[]>([]);

  readonly loadingList = signal(false);
  readonly loadingSelectedGoal = signal(false);
  readonly error = signal<string | null>(null);
  readonly formLoading = signal(false);
  readonly formError = signal<string | null>(null);

  readonly goals = this._goals.asReadonly();
  readonly selectedGoal = this._selectedGoal.asReadonly();
  readonly transactions = this._transactions.asReadonly();
  readonly accounts = this._accounts.asReadonly();

  setGoals(goals: Goal[]) {
    this._goals.set(goals);
  }

  setSelectedGoal(goal: GoalDetails | null) {
    this._selectedGoal.set(goal);
    this._transactions.set(goal?.transactions ?? []);
  }

  setAccounts(accounts: Account[]) {
    this._accounts.set(accounts);
  }

  addGoal(goal: GoalDetails) {
    this._goals.update((goals) => [...goals, this.toGoal(goal)]);
    this.setSelectedGoal(goal);
  }

  updateGoal(goal: GoalDetails) {
    this._goals.update((goals) =>
      goals.map((item) => (item.id === goal.id ? this.toGoal(goal) : item)),
    );

    this.setSelectedGoal(goal);
  }

  removeGoal(goalId: string) {
    this._goals.update((goals) => goals.filter((goal) => goal.id !== goalId));

    if (this._selectedGoal()?.id === goalId) {
      this.setSelectedGoal(null);
    }
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
