import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from './reducers/products.reducer';
import * as fromui from './reducers/ui.reducer';
import * as fromCategories from './reducers/categories.reducer';
import * as fromSort from './reducers/sort.reducer';
import * as fromSelectedProduct from './reducers/product.reducer';
import * as fromSearch from './reducers/search.reducer';
import * as fromCart from './reducers/cart.reducer';
import * as fromAuth from './reducers/authentication.reducer';

export interface StoreInterface {
  products: fromProducts.State;
  ui: fromui.State;
  categories: fromCategories.State;
  sort: fromSort.State;
  product: fromSelectedProduct.State;
  search: fromSearch.State;
  cart: fromCart.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<StoreInterface> = {
  products: fromProducts.productsReducer,
  ui: fromui.uiReducer,
  categories: fromCategories.categoriesReducer,
  sort: fromSort.sortOptionsReducer,
  product: fromSelectedProduct.selectedProductReducer,
  search: fromSearch.searchValueReducer,
  cart: fromCart.cartReducer,
  auth: fromAuth.authReducer,
};
