import { createAction, props } from '@ngrx/store';

export const sortOptionsAction = createAction(
  '[Sort] Sort Products',
  props<{ sortOption: string }>()
);
