import { Category } from '@/app/models/category/category.model';
import { ApiCategory } from './category.api';

export function mapGoalDetails(api: ApiCategory): Category {
  return {
    mccCode: api.mcc_code,
    name: api.name,
    color: api.color,
  };
}
