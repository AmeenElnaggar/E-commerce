import { inject, Injectable, signal, DestroyRef } from '@angular/core';
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
import { selectAuthTokenSelector } from '../../../Store/selectors/authentication.selector';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private store = inject(Store<StoreInterface>);
  private destroyRef = inject(DestroyRef);
  savedProductsFromLS$ = this.store.select(loadCartProductsFromLSSelector);

  isAuth = signal<boolean>(false);

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

  // isAuthFn() {
  //   const subscribtion = this.store
  //     .select(selectAuthTokenSelector)
  //     .subscribe((token) => {
  //       token ? this.isAuth.set(true) : this.isAuth.set(false);
  //     });
  //   this.destroyRef.onDestroy(() => {
  //     subscribtion.unsubscribe();
  //   });
  // }
}
