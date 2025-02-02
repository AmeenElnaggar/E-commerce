import { createAction, props } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';

export const onLoadCartFromLSAction = createAction(
  '[Cart] Load Products From LocalStorage'
);

export const getProductsFromLSAction = createAction(
  '[Cart] Load Cart Products',
  props<{ productsFromLocalStorage: Product[] }>()
);

// --------------------------------------------------------------

export const addProductToLocalStorageAction = createAction(
  '[Cart] Add Product To LocalStorage'
);

// --------------------------------------------------------------

export const updateQuantityAction = createAction(
  '[Cart] Update Quantity Of Product',
  props<{ count: number; selectedProduct: Product }>()
);

// --------------------------------------------------------------

export const deleteProductAction = createAction(
  '[Cart] Delete Product From Cart',
  props<{ selectedProduct: Product }>()
);
