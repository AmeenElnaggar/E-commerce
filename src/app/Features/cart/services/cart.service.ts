import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Product } from '../../../Shared/models/product.model';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import {
  // paymentDetailsSelector,
  savedCartOfLSSelector,
  savedUserCartSelector,
} from '../../../Store/selectors/cart.selector';
import {
  addProductToLSCartAction,
  // addProductToUserCartAction,
  deleteProductInCartLSAction,
  fetchUserCartAction,
  fetchCartFromLSAction,
  updateCountOfProductInCartLSAction,
  initUserCartAction,
  updateProductOfUserCartAction,
  deleteProductOfUserCartAction,
  addProductToUserCartAction,
} from '../../../Store/actions/cart.action';
import {
  BehaviorSubject,
  combineLatest,
  defaultIfEmpty,
  distinctUntilChanged,
  filter,
  first,
  map,
  Observable,
  startWith,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import { authTokenSelector } from '../../../Store/selectors/authentication.selector';
import { Cart } from '../models/cart.model';
import { PaymentDetails } from '../../placeorders/models/payment.model';
import { ProductService } from './../../product/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private store = inject(Store<StoreInterface>);
  private destroyRef = inject(DestroyRef);

  fetchCartFromLS() {
    this.store.dispatch(fetchCartFromLSAction());
  }
  savedCartOfLS$: Observable<Cart> = this.store.select(savedCartOfLSSelector);

  fetchUserCart() {
    this.store.select(authTokenSelector).subscribe((token) => {
      if (token) {
        this.store.dispatch(fetchUserCartAction());
      }
    });
  }
  savedUserCart$: Observable<any> = this.store.select(savedUserCartSelector);

  checkAuth() {
    return this.store.select(authTokenSelector).pipe(take(1));
  }

  initUserCart() {
    this.checkAuth().subscribe((token) => {
      if (token) {
        this.store.dispatch(initUserCartAction());
      }
    });
  }

  addProductToCart(selectedProduct: Product) {
    this.checkAuth().subscribe((token) => {
      if (token) {
        this.store.dispatch(
          addProductToUserCartAction({ product: selectedProduct })
        );
      } else {
        this.savedCartOfLS$.pipe(take(1)).subscribe((response: any) => {
          this.store.dispatch(addProductToLSCartAction());
          this.fetchCartFromLS();
        });
      }
    });
  }

  updateCountOfProductInCart(
    selectedProductCount: number,
    selectedProduct: Product
  ) {
    this.checkAuth().subscribe((token) => {
      if (token) {
        this.store.dispatch(
          updateProductOfUserCartAction({
            product: selectedProduct,
            productCount: selectedProductCount,
          })
        );
      } else {
        this.store.dispatch(
          updateCountOfProductInCartLSAction({
            count: selectedProductCount,
            selectedProduct: selectedProduct,
          })
        );
        this.fetchCartFromLS();
      }
    });
  }

  deleteProductFromCart(selectedProduct: Product) {
    this.checkAuth().subscribe((token) => {
      if (token) {
        this.store.dispatch(
          deleteProductOfUserCartAction({ product: selectedProduct })
        );
      } else {
        this.store.dispatch(
          deleteProductInCartLSAction({ selectedProduct: selectedProduct })
        );
        this.store.dispatch(fetchCartFromLSAction());
      }
    });
  }

  calcCartPrice(products: Product[]) {
    const subTotal = [...products].reduce((acc, ele) => {
      return acc + +ele.count! * ele.price;
    }, 0);

    return {
      products: [...products],
      cartTotalPrice: {
        subTotal,
        shippingFee: subTotal ? 10 : 0,
        totalPrice: subTotal ? subTotal + 10 : 0,
      },
    };
  }

  comparedCarts$ = combineLatest([
    this.savedCartOfLS$,
    this.savedUserCart$,
  ]).pipe(
    // filter(
    //   ([localCart, userCart]) =>
    //     (userCart?.data?.products?.length ?? 0) > 0 ||
    //     (localCart?.products?.length ?? 0) > 0
    // ),
    map(([localCart, userCart]) => {
      const userCartProducts = userCart?.data?.products.map((response: any) => {
        return {
          count: response.count,
          price: response.price,
          imageCover: response.product.imageCover,
          id: response.product.id,
          title: response.product.title,
        };
      });
      const userCartPrice = userCart?.data?.totalCartPrice;
      const userCartData = {
        products: userCartProducts,
        cartTotalPrice: {
          subTotal: userCartPrice,
          shippingFee: userCartPrice ? 10 : 0,
          totalPrice: userCartPrice ? userCartPrice + 10 : 0,
        },
      };

      const displayedProducts = userCartData.products
        ? userCartData
        : localCart;
      return displayedProducts;
    })
  );
}
