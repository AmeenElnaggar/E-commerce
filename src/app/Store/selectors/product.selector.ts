import { createSelector } from '@ngrx/store';
import { StoreInterface } from '../store';

const selectedProductIdSelector = (state: StoreInterface) => {
  return state.product.selectedProductId;
};

const allProductsSelector = (state: StoreInterface) => {
  return state.products.allProducts;
};

export const selectedProductDataSelector = createSelector(
  selectedProductIdSelector,
  allProductsSelector,
  (productId, allProucts) => {
    return allProucts.find((product) => product.id === productId)!;
  }
);

export const relatedProductsSelector = createSelector(
  selectedProductDataSelector,
  allProductsSelector,
  (selectedProduct, allProucts) => {
    return [...allProucts]
      .filter(
        (product) => selectedProduct.category?.name === product.category?.name
      )
      .sort((a, b) => b.price - a.price)
      .slice(0, 5)!;
  }
);
