import { ApiCategory } from './category.api';
import { Category } from '../model/category.model';

export function mapCategory(api: ApiCategory): Category {
  return {
    id: api.id,
    name: api.name,
    type: api.type,
    color: api.color,
    icon: api.icon_path,
  };
}
