import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs';
import { loadCartAction } from '../actions/cart.action';

export class CartEffect {
  private actions$ = inject(Actions);
  private httpClient = inject(HttpClient);

  loadCart = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCartAction),
      switchMap(() => {
        return this.httpClient.get(
          'https://ecommerce.routemisr.com/api/v1/cart'
        );
      }),
      map((products) => ({
        type: '[Cart] Load Cart Products',
        payload: products,
      }))
    )
  );
}
