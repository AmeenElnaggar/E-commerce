import { StoreInterface } from '../store';

export const cartSelector = (state: StoreInterface) => {
  return state.cart.cartProducts;
};
