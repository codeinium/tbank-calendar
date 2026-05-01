import { CategoryType } from '@/app/models/types/category.type';
import { SelectOption } from '../types/select-option.type';

export const CATEGORY_OPTIONS: SelectOption<CategoryType>[] = [
  { value: 'Развлечения', label: 'Развлечения' },
  { value: 'Спорт', label: 'Спорт' },
  { value: 'Образование', label: 'Образование' },
];

export type CategorySelectValue = CategoryType | '';