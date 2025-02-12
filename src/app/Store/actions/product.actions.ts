import { createAction, props } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';

export const selectedProductIdAction = createAction(
  '[Product] Select Specific Product Id',
  props<{ productId: string }>()
);

export const getSelectedProductDataAction = createAction(
  '[Product] Get Product Data',
  props<{ productData: any }>()
);
