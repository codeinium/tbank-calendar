import { Goal, GoalDetails } from '../model/goal.model';
import { ApiGoal, ApiGoalDetails } from './goal.api';

/**
 * Маппинг API цели (краткая) в модель
 */
export function mapGoal(api: ApiGoal): Goal {
  return {
    id: api.id,
    name: api.name,
    target_amount: api.target_amount,
    current_amount: api.current_amount,
    status: api.status,
  };
}

/**
 * Маппинг API цели (полная) в модель
 */
export function mapGoalDetails(api: ApiGoalDetails): GoalDetails {
  return {
    id: api.id,
    account_id: api.account_id,
    name: api.name,
    target_amount: api.target_amount,
    current_amount: api.current_amount,
    deadline: api.deadline,
    achieved_at: api.achieved_at,
    hard_mode: api.hard_mode,
    status: api.status,
    auto_pay: api.auto_pay,
  };
}
