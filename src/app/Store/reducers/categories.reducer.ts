import { createReducer, on } from '@ngrx/store';
import { selectedCategoriesAction } from '../actions/categories.action';

export interface State {
  selectedCategories: string[];
}

const initialState: State = {
  selectedCategories: [],
};

export const categoriesReducer = createReducer(
  initialState,
  on(selectedCategoriesAction, (state, action) => {
    const isSelected = state.selectedCategories.includes(action.categoryId);
    return {
      ...state,
      selectedCategories: isSelected
        ? state.selectedCategories.filter(
            (categoryId) => categoryId !== action.categoryId
          )
        : [...state.selectedCategories, action.categoryId],
    };
  })
);
