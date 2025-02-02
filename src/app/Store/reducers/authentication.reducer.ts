import { createReducer, on } from '@ngrx/store';
import {
  authFailureAction,
  authSuccessAction,
} from '../actions/authentication.action';

export interface State {
  token: string | null;
  user: any | null;
  error: any | null;
  loginOrLogout: string;
}

const initialState: State = {
  token: null,
  user: null,
  error: null,
  loginOrLogout: 'Login',
};

export const authReducer = createReducer(
  initialState,
  on(authSuccessAction, (state, action) => {
    const isLoginOrLogout = action.user !== null ? 'Logout' : 'Login';
    return {
      ...state,
      error: null,
      token: action.token,
      user: action.user,
      loginOrLogout: isLoginOrLogout,
    };
  }),
  on(authFailureAction, (state, action) => {
    return { ...state, error: action.error, token: null, user: null };
  })
);
