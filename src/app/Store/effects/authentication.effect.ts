import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  loginAction,
  signupAction,
  signupStatusAction,
} from '../actions/authentication.action';
import { loginStatusAction } from './../actions/authentication.action';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';
import { startLoadingAction, stopLoadingAction } from '../actions/ui.actions';

export class AuthenticationEffect {
  private actions$ = inject(Actions);
  private httpClient = inject(HttpClient);
  private store = inject(Store<StoreInterface>);

  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/auth/';

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      tap(() => this.store.dispatch(startLoadingAction())),
      switchMap((action) => {
        const isLogin = action.type === '[Auth] Login' && 'signin';
        const userData = action.userData;
        const url = this.apiUrl + isLogin;
        return this.httpClient.post(url, userData).pipe(
          map((response: any) => {
            localStorage.setItem('token', response.token);

            return loginStatusAction({
              token: response.token,
              error: false,
            });
          }),
          tap(() => this.store.dispatch(stopLoadingAction())),

          catchError((error: Error) => {
            this.store.dispatch(stopLoadingAction());
            return of(loginStatusAction({ token: '', error: true }));
          })
        );
      })
    )
  );

  signupEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(signupAction),
      switchMap((action) => {
        const isSignup = action.type === '[Auth] Signup' && 'signup';
        const userData = action.userData;
        const url = this.apiUrl + isSignup;
        return this.httpClient.post(url, userData).pipe(
          map((response: any) =>
            signupStatusAction({
              isSuccess: true,
              isError: false,
            })
          ),
          catchError(() => {
            return of(signupStatusAction({ isError: true, isSuccess: false }));
          })
        );
      })
    )
  );
}
