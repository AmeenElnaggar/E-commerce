import { StoreInterface } from '../store';

export const selectedCategoriesSelector = (state: StoreInterface) => {
  return state.categories.selectedCategories;
};
