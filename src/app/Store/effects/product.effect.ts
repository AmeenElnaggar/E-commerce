import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  map,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Product } from '../../Shared/models/product.model';
import {
  startLoadingAction,
  stopLoadingAction,
  uiFailureAction,
} from '../actions/ui.actions';
import {
  fetchModifiedCollectionAction,
  getModifiedProductsAction,
} from '../actions/collections.action';
import { selectedCategoriesSelector } from '../selectors/categories.selector';
import {
  getSelectedProductDataAction,
  selectedProductIdAction,
} from '../actions/product.actions';

export class ProductEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);

  fetchModifiedCollection = createEffect(() =>
    this.actions$.pipe(
      ofType(selectedProductIdAction),
      tap(() => this.store.dispatch(startLoadingAction())),
      switchMap((action) => {
        return this.httpClient
          .get<any>(
            `https://ecommerce.routemisr.com/api/v1/products/${action.productId}`
          )
          .pipe(
            map((response: any) => {
              response = { ...response.data, count: 1 };
              return getSelectedProductDataAction({
                productData: response,
              });
            })
          );
      }),
      tap((res) => this.store.dispatch(stopLoadingAction())),
      catchError(() => {
        this.store.dispatch(stopLoadingAction());
        return of(
          uiFailureAction({
            error: true,
          })
        );
      })
    )
  );
}
