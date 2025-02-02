import { createReducer, on } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';
import {
  getProductsFromLSAction,
  updateQuantityAction,
} from '../actions/cart.action';

export interface State {
  localStorageProducts: Product[];
  quantity: number;
}

const initialState: State = {
  localStorageProducts: [],
  quantity: 1,
};
// addedProduct: {
//   id: '',
//   imageCover: '',
//   price: 0,
//   title: '',
// },

export const cartReducer = createReducer(
  initialState,
  on(getProductsFromLSAction, (state, action) => {
    return { ...state, localStorageProducts: action.productsFromLocalStorage };
  })
  // on(updateQuantityAction, (state, action) => {
  //   return { ...state, quantity: action.quantity };
  // })
);
