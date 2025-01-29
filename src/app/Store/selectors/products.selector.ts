import { StoreInterface } from '../store';

export const allProductsSelector = (state: StoreInterface) => {
  return state.products.allProducts;
};
