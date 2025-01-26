import { StoreInterface } from '../store';

export const productsSelector = (state: StoreInterface) => {
  return state.products.allProducts;
};
