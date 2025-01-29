import { createAction, props } from '@ngrx/store';

export const selectedCategoriesAction = createAction(
  '[Categories] Selected Category',
  props<{ categoryId: string }>()
);
