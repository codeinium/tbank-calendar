import { SelectOption } from '../types/select-option.type';
import { SortValue } from '../types/sort.type';

export const SORT_OPTIONS: SelectOption<SortValue>[] = [
  { value: 'date-asc', label: 'По дате (сначала ближайшие)' },
  { value: 'date-desc', label: 'По дате (сначала дальние)' },
  { value: 'name-asc', label: 'По названию а-я' },
  { value: 'name-desc', label: 'По названию я-а' },
  { value: 'price-asc', label: 'По цене ↑' },
  { value: 'price-desc', label: 'По цене ↓' },
];
