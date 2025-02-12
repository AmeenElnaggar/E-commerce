import { StoreInterface } from '../store';

export const categoriesDataSelector = (state: StoreInterface) => {
  return state.collection.categories;
};

export const selectedCategoriesSelector = (state: StoreInterface) => {
  return state.categories.selectedCategories;
};
