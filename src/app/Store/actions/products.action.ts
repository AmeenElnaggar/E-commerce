import { createAction, props } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';

export const getProducts = createAction(
  '[products] Get Avaliable Products',
  props<{ products: Product[] }>()
);
