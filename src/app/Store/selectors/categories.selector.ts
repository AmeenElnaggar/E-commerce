import { StoreInterface } from '../store';

export const categoriesDataSelector = (state: StoreInterface) => {
  return state.products.categories;
};

export const selectedCategoriesSelector = (state: StoreInterface) => {
  return state.categories.selectedCategories;
};
