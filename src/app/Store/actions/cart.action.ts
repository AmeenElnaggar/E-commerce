import { createAction, props } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';

export const onLoadCartFromLSAction = createAction(
  '[Cart] Load Products From LocalStorage'
);

export const getProductsFromLSAction = createAction(
  '[Cart] Get Cart Products',
  props<{ productsFromLocalStorage: Product[] }>()
);

export const addProductToLocalStorageAction = createAction(
  '[Cart] Add Product To LocalStorage'
);

export const updateQuantityAction = createAction(
  '[Cart] Update Quantity Of Product',
  props<{ count: number; selectedProduct: Product }>()
);

export const deleteProductAction = createAction(
  '[Cart] Delete Product From Cart',
  props<{ selectedProduct: Product }>()
);

// --------------------------------------------------------------

export const addProductToLoggedUserAction = createAction(
  '[Cart] Add Product To Logged User'
);

export const deleteProductToLoggedUserAction = createAction(
  '[Cart] delete Product To Logged User'
);

export const updateProductCountOfLoggedUserAction = createAction(
  '[Cart] Update Product Count To Logged User'
);

export const onLoadProductsOfLoggedUserAction = createAction(
  '[Cart] Load Products To Logged User'
);

export const getProductsOfLoggedUserAction = createAction(
  '[Cart] Get Products Of Logged User',
  props<{ productsOfLoggedUser: Product[] }>()
);
