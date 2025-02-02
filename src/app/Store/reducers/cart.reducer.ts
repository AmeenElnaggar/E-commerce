import { createReducer, on } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';
import {
  getProductsFromLSAction,
  getProductsOfLoggedUserAction,
  updateQuantityAction,
} from '../actions/cart.action';

export interface State {
  localStorageProducts: Product[];
  loggedUserProducts: Product[];
}

const initialState: State = {
  localStorageProducts: [],
  loggedUserProducts: [],
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
  }),
  on(getProductsOfLoggedUserAction, (state, action) => {
    return { ...state, loggedUserProducts: action.productsOfLoggedUser };
  })
);
