import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';
import { HttpClient } from '@angular/common/http';
import { fetchOrdersAction, getOrdersAction } from '../actions/orders.action';
import { map, switchMap } from 'rxjs';

export class OrdersEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);

  ordersEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchOrdersAction),
      switchMap(() =>
        this.httpClient
          .get(
            `https://ecommerce.routemisr.com/api/v1/orders/user/67ac4dbf048215112f1c0f75`
          )
          .pipe(
            map((response: any) => {
              return getOrdersAction({ ordersData: response });
            })
          )
      )
    )
  );
}
