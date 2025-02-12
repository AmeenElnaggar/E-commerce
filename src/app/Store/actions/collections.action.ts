import { createAction, props } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';

export const fetchModifiedCollectionAction = createAction(
  '[Collection] Fetch Collection Of Products',
  props<{ page?: number; limit?: number; categorId?: string }>()
);

export const getModifiedProductsAction = createAction(
  '[Products] Get Avaliable Products',
  props<{ payload: Product[]; metaData: any }>()
);

// ----------------------------------------------------------

export const fetchOriginalCollectionAction = createAction(
  '[Collection] Fetch Original Collection'
);

export const getOriginalProductsAction = createAction(
  '[Products] Get Original Products',
  props<{ payload: Product[] }>()
);
