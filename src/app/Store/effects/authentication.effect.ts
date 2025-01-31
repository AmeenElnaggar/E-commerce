import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  authFailureAction,
  loginAction,
  signupAction,
} from '../actions/authentication.action';
import { authSuccessAction } from './../actions/authentication.action';
import { startLoading, stopLoading } from '../actions/ui.actions';

export class AuthenticationEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);
  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/auth/';

  loginOrSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction, signupAction),
      // tap(() => this.store.dispatch(startLoading())),

      switchMap((action) => {
        if ('userData' in action) {
          const isLogin = action.type === '[Auth] Login';
          const userData = action.userData;
          const url = this.apiUrl + (isLogin ? 'signin' : 'signup');
          return this.httpClient.post(url, userData).pipe(
            map((response: any) => {
              localStorage.setItem('token', response.token);
              return authSuccessAction({
                token: response.token,
                user: response.user,
              });
            }),

            // tap(() => this.store.dispatch(stopLoading())),
            catchError((error: Error) => {
              // this.store.dispatch(stopLoading())
              return of(authFailureAction({ error: error.message }));
            })
          );
        }

        return of(authFailureAction({ error: 'Invalid action payload' }));
      })
    )
  );
}
