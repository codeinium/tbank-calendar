import { TestBed } from '@angular/core/testing';
import { CategoriesStore } from './category.store';
import { CategoriesService } from './category.service';
import { of } from 'rxjs';
import { Category } from '@/app/models/category/category.model';

describe('CategoriesStore', () => {
  let store: CategoriesStore;
  let mockService: { getCategories: ReturnType<typeof vi.fn> };

  const mockCategories: Category[] = [
    { mccCode: 123, name: 'Супермаркеты', color: '#77FF00' },
    { mccCode: 124, name: 'Развлечения', color: '#FB00FF' },
    { mccCode: 12, name: 'Здоровье', color: '#FF0000' },
  ];

  beforeEach(() => {
    mockService = { getCategories: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        CategoriesStore,
        { provide: CategoriesService, useValue: mockService },
      ],
    });

    store = TestBed.inject(CategoriesStore);
  });

  it('should start with empty categories, not loading, no error', () => {
    expect(store.categories()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('should load categories and set signals', () => {
    mockService.getCategories.mockReturnValue(of(mockCategories));

    store.loadCategories();

    expect(store.loading()).toBe(false);
    expect(store.categories()).toEqual(mockCategories);
    expect(store.error()).toBeNull();
  });

  it('should compute categoryOptions from categories', () => {
    mockService.getCategories.mockReturnValue(of(mockCategories));

    store.loadCategories();

    const options = store.categoryOptions();
    expect(options).toEqual([
      { value: 'Супермаркеты', label: 'Супермаркеты', color: '#77FF00', mccCode: 123 },
      { value: 'Развлечения', label: 'Развлечения', color: '#FB00FF', mccCode: 124 },
      { value: 'Здоровье', label: 'Здоровье', color: '#FF0000', mccCode: 12 },
    ]);
  });

  it('should return empty array from categoryOptions when no categories', () => {
    expect(store.categoryOptions()).toEqual([]);
  });

  it('should not reload if force=false and loaded recently', () => {
    mockService.getCategories.mockReturnValue(of(mockCategories));

    store.loadCategories();
    expect(mockService.getCategories).toHaveBeenCalledTimes(1);

    store.loadCategories(false);
    expect(mockService.getCategories).toHaveBeenCalledTimes(1);
  });

  it('should reload if force=true', () => {
    mockService.getCategories.mockReturnValue(of(mockCategories));

    store.loadCategories();
    expect(mockService.getCategories).toHaveBeenCalledTimes(1);

    store.loadCategories(true);
    expect(mockService.getCategories).toHaveBeenCalledTimes(2);
  });
});
