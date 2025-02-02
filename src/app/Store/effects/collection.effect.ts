import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { Product } from '../../Shared/models/product.model';
import { startLoading, stopLoading } from '../actions/ui.actions';
import {
  getAllProducts,
  getCollectionAction,
} from '../actions/products.action';

export class CollectionEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);

  fetchCollection = createEffect(() =>
    this.actions$.pipe(
      ofType(getCollectionAction),
      tap(() => this.store.dispatch(startLoading())),
      switchMap(() => {
        return this.httpClient
          .get<{ data: Product[] }>(
            'https://ecommerce.routemisr.com/api/v1/products'
          )
          .pipe(
            map((res) =>
              res['data'].map((product) => {
                return { ...product, count: 1 };
              })
            )
          )
          .pipe(
            map((response: Product[]) => {
              return getAllProducts({ payload: response });
            })
          );
      }),

      tap(() => this.store.dispatch(stopLoading())),
      catchError(() => {
        this.store.dispatch(stopLoading());
        return of({
          type: '[ERROR] Error Occurred',
          errorMsg:
            'Something went wrong fetching the avaliable collections 💥💥. Please try again later.',
        });
      })
    )
  );
}
