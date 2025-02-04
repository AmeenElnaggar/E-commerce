import { createAction, props } from '@ngrx/store';

export const getAllCategoriesAction = createAction(
  '[Categories] Fetch Categories'
);

export const selectedCategoriesAction = createAction(
  '[Categories] Selected Category',
  props<{ categoryId: string }>()
);
