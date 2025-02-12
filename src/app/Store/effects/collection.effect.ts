import { DestroyRef, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';

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
  throwError,
  withLatestFrom,
} from 'rxjs';
import { Product } from '../../Shared/models/product.model';
import {
  startLoadingAction,
  stopLoadingAction,
  uiFailureAction,
} from '../actions/ui.actions';
import {
  fetchOriginalCollectionAction,
  getOriginalProductsAction,
  fetchModifiedCollectionAction,
  getModifiedProductsAction,
} from '../actions/collections.action';
import { selectedCategoriesSelector } from '../selectors/categories.selector';
import { CollectionsService } from '../../Shared/services/collections.service';

export class CollectionEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);

  fetchOrigianlCollection = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchOriginalCollectionAction),
      tap(() => this.store.dispatch(startLoadingAction())),
      switchMap((action) => {
        return this.httpClient.get<{ data: Product[] }>(
          `https://ecommerce.routemisr.com/api/v1/products`
        );
      }),
      map((response: any) => {
        response = response['data'].map((product: any) => ({
          ...product,
          count: 1,
        }));
        return getOriginalProductsAction({ payload: response });
      }),
      tap(() => this.store.dispatch(stopLoadingAction())),
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

  fetchModifiedCollection = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchModifiedCollectionAction),

      tap(() => this.store.dispatch(startLoadingAction())),

      withLatestFrom(this.store.select(selectedCategoriesSelector)),
      switchMap(([action, categoriesIds]) => {
        const currentPage = action.page;
        const categoryQuery = categoriesIds
          .map((categoryId) => `&category[in]=${categoryId}`)
          .join('');

        return this.httpClient
          .get<{ data: Product[] }>(
            `https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}&limit=8${categoryQuery}`
          )
          .pipe(
            take(1),
            map((response: any) => {
              const { metadata, data } = response;
              return getModifiedProductsAction({
                payload: data,
                metaData: metadata,
              });
            })
          );
      }),

      tap(() => this.store.dispatch(stopLoadingAction())),

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
