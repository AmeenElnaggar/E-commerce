import { createAction, props } from '@ngrx/store';

export const selectedProductAction = createAction(
  '[Product] Select Specific Product',
  props<{ productId: string }>()
);
