import { createAction, props } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';

export const getCollectionAction = createAction(
  '[Collection] Fetch Collection Of Products'
);

export const getAllProducts = createAction(
  '[Products] Get Avaliable Products',
  props<{ payload: Product[] }>()
);
