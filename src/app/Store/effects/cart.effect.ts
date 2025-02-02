import { DestroyRef, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, of, switchMap, take, tap } from 'rxjs';
import {
  addProductToLocalStorageAction,
  addProductToLoggedUserAction,
  deleteProductAction,
  getProductsFromLSAction,
  onLoadProductsOfLoggedUserAction,
  onLoadCartFromLSAction,
  updateQuantityAction,
  getProductsOfLoggedUserAction,
  updateProductCountOfLoggedUserAction,
  deleteProductToLoggedUserAction,
} from '../actions/cart.action';
import { Product } from '../../Shared/models/product.model';
import { selectedProductDataSelector } from '../selectors/product.selector';
import { CartService } from '../../Features/cart/services/cart.service';

export class CartEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  onLoadCartFromLS = createEffect(() =>
    this.actions$.pipe(
      ofType(onLoadCartFromLSAction),
      switchMap(() => {
        let loadedProducts: any = localStorage.getItem('Products');
        loadedProducts = loadedProducts ? JSON.parse(loadedProducts) : [];
        return of(
          getProductsFromLSAction({ productsFromLocalStorage: loadedProducts })
        );
      })
    )
  );

  onAddProductToLS = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addProductToLocalStorageAction),
        switchMap(() => {
          this.store
            .select(selectedProductDataSelector)
            .pipe(take(1))
            .subscribe((selectedProduct) => {
              let updatedCart = [];
              let loadedProducts: any = localStorage.getItem('Products');
              loadedProducts = loadedProducts ? JSON.parse(loadedProducts) : [];
              const isProductExist = loadedProducts.some(
                (product: Product) => product.id === selectedProduct.id
              );
              const { id, count, price, imageCover, title } = selectedProduct;

              updatedCart = isProductExist
                ? loadedProducts
                : [
                    ...loadedProducts,
                    {
                      id,
                      count,
                      price,
                      imageCover,
                      title,
                      date: new Date(),
                    },
                  ];
              localStorage.setItem('Products', JSON.stringify(updatedCart));
            });
          return of();
        })
      ),
    { dispatch: false }
  );

  onUpdateCountOfProductLS = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateQuantityAction),
        switchMap(({ count, selectedProduct }) => {
          let loadedProducts: any = localStorage.getItem('Products');
          loadedProducts = loadedProducts ? JSON.parse(loadedProducts) : [];

          const updatedProducts = loadedProducts.map((product: Product) =>
            product.id === selectedProduct.id
              ? { ...product, count: count }
              : product
          );

          localStorage.setItem('Products', JSON.stringify(updatedProducts));
          return of();
        })
      ),
    { dispatch: false }
  );

  onDeleteProductFromLS = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteProductAction),
        switchMap(({ selectedProduct }) => {
          let loadedProducts: any = localStorage.getItem('Products');
          loadedProducts = loadedProducts ? JSON.parse(loadedProducts) : [];

          const updatedProducts = loadedProducts.filter((product: Product) => {
            return product.id !== selectedProduct.id;
          });
          localStorage.setItem('Products', JSON.stringify(updatedProducts));
          return of();
        })
      ),
    { dispatch: false }
  );

  onAddProductToLoggedUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addProductToLoggedUserAction),
        switchMap(() => {
          const subscribtion = this.cartService.savedProductsFromLS$
            .pipe(take(1))
            .subscribe((products) => {
              products.forEach((product: Product) => {
                this.httpClient
                  .post('https://ecommerce.routemisr.com/api/v1/cart', {
                    productId: product.id,
                  })
                  .subscribe({
                    next: (res) => console.log('ADDED'),
                  });
              });
            });
          return of();
        })
      ),
    { dispatch: false }
  );

  onDeleteProductToLoggedUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteProductToLoggedUserAction),
        switchMap(() => {
          const subscribtion = this.cartService.savedProductsFromLS$
            .pipe(take(1))
            .subscribe((products) => {
              products.forEach((product: Product) => {
                this.httpClient
                  .delete(
                    `https://ecommerce.routemisr.com/api/v1/cart/${product.id}`
                  )
                  .subscribe({
                    next: (res) => console.log('DELETED'),
                  });
              });
            });
          return of();
        })
      ),
    { dispatch: false }
  );

  onUpdateProductCountToLoggedUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProductCountOfLoggedUserAction),
        switchMap(() => {
          const subscribtion = this.cartService.savedProductsFromLS$.subscribe(
            (products) => {
              products.forEach((product: Product) => {
                this.httpClient
                  .put(
                    `https://ecommerce.routemisr.com/api/v1/cart/${product.id}`,
                    {
                      count: `${product.count}`,
                    }
                  )
                  .subscribe({
                    next: (res) => console.log('UPDATED'),
                  });
              });
            }
          );
          return of();
        })
      ),
    { dispatch: false }
  );

  onLoadProductsOfLoggedUser = createEffect(() =>
    this.actions$.pipe(
      ofType(onLoadProductsOfLoggedUserAction),
      switchMap(() => {
        return this.httpClient
          .get<Product[]>('https://ecommerce.routemisr.com/api/v1/cart')
          .pipe(
            map((response: Product[]) => {
              return getProductsOfLoggedUserAction({
                productsOfLoggedUser: response,
              });
            })
          );
      })
    )
  );
}

// loadCart = createEffect(() =>
//   this.actions$.pipe(
//     ofType(loadCartAction),
//     switchMap(() => {
//       return this.httpClient.get(
//         'https://ecommerce.routemisr.com/api/v1/cart'
//       );
//     }),
//     map((products) => ({
//       type: '[Cart] Load Cart Products',
//       payload: products,
//     }))
//   )
// );
