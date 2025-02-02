import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../../../Shared/models/product.model';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { loadCartProductsFromLSSelector } from '../../../Store/selectors/cart.selector';
import {
  addProductToLocalStorageAction,
  deleteProductAction,
  onLoadCartFromLSAction,
  updateQuantityAction,
} from '../../../Store/actions/cart.action';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private store = inject(Store<StoreInterface>);
  savedProductsFromLS$ = this.store.select(loadCartProductsFromLSSelector);

  startFetchCartProductsFromLS() {
    this.store.dispatch(onLoadCartFromLSAction());
  }

  addProductToLocalStorage() {
    this.store.dispatch(addProductToLocalStorageAction());
  }

  updateCount(count: number, selectedProduct: Product) {
    this.store.dispatch(
      updateQuantityAction({ count: count, selectedProduct: selectedProduct })
    );
    this.store.dispatch(onLoadCartFromLSAction());
  }

  deleteProduct(selectedProduct: Product) {
    this.store.dispatch(
      deleteProductAction({ selectedProduct: selectedProduct })
    );
    this.store.dispatch(onLoadCartFromLSAction());
  }
}
