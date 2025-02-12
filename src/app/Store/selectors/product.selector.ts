import { createSelector } from '@ngrx/store';
import { StoreInterface } from '../store';

export const selectedProductDataSelector = (state: StoreInterface) => {
  return state.product.selectedProductData;
};

const originalProductsSelector = (state: StoreInterface) => {
  return state.collection.originalProducts;
};

export const relatedProductsSelector = createSelector(
  selectedProductDataSelector,
  originalProductsSelector,
  (selectedProduct, originalProducts) => {
    return [...originalProducts]
      .filter(
        (product) => selectedProduct.category?.name === product.category?.name
      )
      .slice(0, 5)!;
  }
);
