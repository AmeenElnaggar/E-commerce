import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from './reducers/products.reducer';

export interface StoreInterface {
  products: fromProducts.State;
}

export const reducers: ActionReducerMap<StoreInterface> = {
  products: fromProducts.productsReducer,
};
