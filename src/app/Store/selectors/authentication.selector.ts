import { createSelector } from '@ngrx/store';
import { StoreInterface } from '../store';

export const selectAuthState = (state: StoreInterface) => {
  return state.auth;
};

export const authTokenSelector = createSelector(selectAuthState, (state) => {
  return state.token;
});

export const loginErrorSelector = createSelector(
  selectAuthState,
  (state) => state.loginError
);

// --------------------------------------------------------

export const statusSelector = createSelector(selectAuthState, (state) => {
  return state.loginOrLogout;
});

// --------------------------------------------------------

export const signupErrorSelector = createSelector(
  selectAuthState,
  (state) => state.signupError
);

export const signupSuccesSelector = createSelector(
  selectAuthState,
  (state) => state.signupSuccess
);
