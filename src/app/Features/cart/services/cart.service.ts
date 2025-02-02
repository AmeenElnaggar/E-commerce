import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../../../Shared/models/product.model';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import {
  loadCartProductsFromLSSelector,
  loadCartProductsOfLoggedUserSelector,
} from '../../../Store/selectors/cart.selector';
import {
  addProductToLocalStorageAction,
  addProductToLoggedUserAction,
  deleteProductAction,
  onLoadProductsOfLoggedUserAction,
  onLoadCartFromLSAction,
  updateQuantityAction,
  updateProductCountOfLoggedUserAction,
  deleteProductToLoggedUserAction,
} from '../../../Store/actions/cart.action';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private store = inject(Store<StoreInterface>);
  savedProductsFromLS$ = this.store.select(loadCartProductsFromLSSelector);

  savedProductsOfLoggedUser$: Observable<Product[]> = this.store
    .select(loadCartProductsOfLoggedUserSelector)
    .pipe(
      map((response: any) => {
        return response?.data?.products || [];
      })
    );

  isAuth = signal<boolean>(false);

  startFetchCartProductsFromLS() {
    this.store.dispatch(onLoadCartFromLSAction());
  }

  addProductToLocalStorage() {
    this.store.dispatch(addProductToLocalStorageAction());
  }

  updateCountOfProductToLS(count: number, selectedProduct: Product) {
    this.store.dispatch(
      updateQuantityAction({ count: count, selectedProduct: selectedProduct })
    );
    this.store.dispatch(onLoadCartFromLSAction());
  }

  deleteProductFromLS(selectedProduct: Product) {
    this.store.dispatch(
      deleteProductAction({ selectedProduct: selectedProduct })
    );
    this.store.dispatch(onLoadCartFromLSAction());
  }

  addProductToLoggedUser() {
    this.store.dispatch(addProductToLoggedUserAction());
  }

  updateProductCountOfLoggedUser() {
    this.store.dispatch(updateProductCountOfLoggedUserAction());
  }

  deleteProductOfLoggedUser() {
    this.store.dispatch(deleteProductToLoggedUserAction());
  }

  loadProductsOfLoggedUser() {
    this.store.dispatch(onLoadProductsOfLoggedUserAction());
  }

  getProductDate(selectedProduct: Product) {
    let loadedData: any = localStorage.getItem('Products');
    loadedData = loadedData ? JSON.parse(loadedData) : [];
    const existProduct = loadedData.find(
      (product: Product) => product.id === selectedProduct.id
    );
    return existProduct.date;
  }
}
