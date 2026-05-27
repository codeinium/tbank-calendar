import { Injectable, inject } from '@angular/core';
import { GoalsService } from '@/app/services/goal/goal.service';
import { GoalsPageStore } from '../store/goal-page.store';
import {
  CreateGoalRequest,
  GoalContributeRequest,
  GoalWithdrawRequest,
  UpdateGoalAutoPayRequest,
  UpdateGoalRequest,
} from '@/app/models/goal/goal.model';

type SetFieldErrors = (errors: Record<string, string>) => void;

@Injectable()
export class GoalsPageService {
  private readonly goalsService = inject(GoalsService);
  private readonly store = inject(GoalsPageStore);

  loadGoals() {
    this.store.loadingList.set(true);
    this.store.error.set(null);

    this.goalsService.getGoals().subscribe({
      next: (goals) => {
        this.store.setGoals(goals);
        this.store.loadingList.set(false);
      },
      error: () => {
        this.store.error.set('Не удалось загрузить цели');
        this.store.loadingList.set(false);
      },
    });
  }

  loadGoalDetails(goalId: string) {
    this.store.loadingSelectedGoal.set(true);
    this.store.error.set(null);

    this.goalsService.getGoalDetails(goalId).subscribe({
      next: (goal) => {
        this.store.setSelectedGoal(goal);
        this.store.loadingSelectedGoal.set(false);
      },
      error: () => {
        this.store.error.set('Не удалось загрузить цель');
        this.store.loadingSelectedGoal.set(false);
      },
    });
  }

  loadAccounts() {
    this.goalsService.getGoalAccounts().subscribe({
      next: (accounts) => {
        this.store.setAccounts(accounts);
      },
      error: () => {
        this.store.error.set('Не удалось загрузить счета');
      },
    });
  }

  createGoal(request: CreateGoalRequest, setFieldErrors?: SetFieldErrors, onSuccess?: () => void) {
    this.store.formLoading.set(true);
    this.store.formError.set(null);

    this.goalsService.createGoal(request).subscribe({
      next: (goal) => {
        this.store.addGoal(goal);
        this.store.formLoading.set(false);
        onSuccess?.();
      },
      error: (error) => {
        this.handleFormError(error, 'Не удалось создать цель', setFieldErrors);
      },
    });
  }

  updateGoal(
    goalId: string,
    request: UpdateGoalRequest,
    setFieldErrors?: SetFieldErrors,
    onSuccess?: () => void,
  ) {
    this.store.formLoading.set(true);
    this.store.formError.set(null);

    this.goalsService.updateGoal(goalId, request).subscribe({
      next: (goal) => {
        this.store.updateGoal(goal);
        this.store.formLoading.set(false);
        onSuccess?.();
      },
      error: (error) => {
        this.handleFormError(error, 'Не удалось обновить цель', setFieldErrors);
      },
    });
  }

  updateGoalAutoPay(
    goalId: string,
    request: UpdateGoalAutoPayRequest,
    setFieldErrors?: SetFieldErrors,
    onSuccess?: () => void,
  ) {
    this.store.formLoading.set(true);
    this.store.formError.set(null);

    this.goalsService.updateGoalAutoPay(goalId, request).subscribe({
      next: (goal) => {
        this.store.updateGoal(goal);
        this.store.formLoading.set(false);
        onSuccess?.();
      },
      error: (error) => {
        this.handleFormError(error, 'Не удалось обновить автоплатёж', setFieldErrors);
      },
    });
  }

  cancelGoal(goalId: string, onSuccess?: () => void) {
    this.store.formLoading.set(true);
    this.store.formError.set(null);

    this.goalsService.cancelGoal(goalId).subscribe({
      next: () => {
        this.store.removeGoal(goalId);
        this.store.formLoading.set(false);
        onSuccess?.();
      },
      error: () => {
        this.store.formError.set('Не удалось отменить цель');
        this.store.formLoading.set(false);
      },
    });
  }

  contribute(
    goalId: string,
    request: GoalContributeRequest,
    onFieldErrors?: (errors: Record<string, string>) => void,
    onSuccess?: () => void,
  ) {
    this.store.formLoading.set(true);
    this.store.formError.set(null);

    this.goalsService.contribute(goalId, request).subscribe({
      next: (goal) => {
        this.store.updateGoal(goal);
        this.store.formLoading.set(false);
        onSuccess?.();
      },
      error: (error) => {
        this.handleFormError(error, 'Не удалось пополнить цель', onFieldErrors);
      },
    });
  }

  withdraw(
    goalId: string,
    request: GoalWithdrawRequest,
    onFieldErrors?: (errors: Record<string, string>) => void,
    onSuccess?: () => void,
  ) {
    this.store.formLoading.set(true);
    this.store.formError.set(null);

    this.goalsService.withdraw(goalId, request).subscribe({
      next: (goal) => {
        this.store.updateGoal(goal);
        this.store.formLoading.set(false);
        onSuccess?.();
      },
      error: (error) => {
        this.handleFormError(error, 'Не удалось снять деньги с цели', onFieldErrors);
      },
    });
  }

  private handleFormError(
    error: any,
    fallbackMessage: string,
    onFieldErrors?: (errors: Record<string, string>) => void,
  ) {
    const message = error?.error?.message || fallbackMessage;
    const fieldErrors = error?.error?.errors;

    if (fieldErrors && onFieldErrors) {
      onFieldErrors(fieldErrors);
    } else {
      this.store.formError.set(message);
    }

    this.store.formLoading.set(false);
  }
}
