import { StoreInterface } from '../store';

export const loadCartProductsFromLSSelector = (state: StoreInterface) => {
  return state.cart.localStorageProducts;
};

export const loadCartProductsOfLoggedUserSelector = (state: StoreInterface) => {
  return state.cart.loggedUserProducts;
};
