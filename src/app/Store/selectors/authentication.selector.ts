import { createSelector } from '@ngrx/store';
import { StoreInterface } from '../store';

export const selectAuthState = (state: StoreInterface) => {
  return state.auth;
};

export const selectAuthTokenSelector = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectAuthUserSelector = createSelector(
  selectAuthState,
  (state) => state.user
);
export const selectAuthErrorSelector = createSelector(
  selectAuthState,
  (state) => state.error
);

export const authStatusSelector = createSelector(
  selectAuthState,
  (state) => state.loginOrLogout
);
