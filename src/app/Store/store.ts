import { ActionReducerMap } from '@ngrx/store';
import * as fromCollection from './reducers/collections.reducer';
import * as fromui from './reducers/ui.reducer';
import * as fromCategories from './reducers/categories.reducer';
import * as fromSort from './reducers/sort.reducer';
import * as fromSelectedProduct from './reducers/product.reducer';
import * as fromSearch from './reducers/search.reducer';
import * as fromCart from './reducers/cart.reducer';
import * as fromAuth from './reducers/authentication.reducer';
import * as fromOrders from './reducers/orders.reducer';

export interface StoreInterface {
  collection: fromCollection.State;
  ui: fromui.State;
  categories: fromCategories.State;
  sort: fromSort.State;
  product: fromSelectedProduct.State;
  search: fromSearch.State;
  cart: fromCart.State;
  auth: fromAuth.State;
  orders: fromOrders.State;
}

export const reducers: ActionReducerMap<StoreInterface> = {
  collection: fromCollection.collectionReducer,
  ui: fromui.uiReducer,
  categories: fromCategories.categoriesReducer,
  sort: fromSort.sortOptionsReducer,
  product: fromSelectedProduct.selectedProductReducer,
  search: fromSearch.searchValueReducer,
  cart: fromCart.cartReducer,
  auth: fromAuth.authReducer,
  orders: fromOrders.oredersReducer,
};
