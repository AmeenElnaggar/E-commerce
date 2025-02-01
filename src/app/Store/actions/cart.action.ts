import { createAction, props } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';

export const loadCartAction = createAction('[Cart] Load Products From Cart');

export const cartAction = createAction(
  '[Cart] Load Cart Products',
  props<{ payload: Product[] }>()
);
