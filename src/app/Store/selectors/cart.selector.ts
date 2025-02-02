import { StoreInterface } from '../store';

export const loadCartProductsFromLSSelector = (state: StoreInterface) => {
  return state.cart.localStorageProducts;
};

// export const updateQuantitySelector = (state: StoreInterface) => {
//   return state.cart.quantity;
// };
