import { createReducer, on } from '@ngrx/store';
import {
  loginStatusAction,
  signupStatusAction,
} from '../actions/authentication.action';

export interface State {
  token: string;
  loginError: boolean;
  signupError: boolean;
  signupSuccess: boolean;
  loginOrLogout: string;
}

const initialState: State = {
  token: '',
  loginError: false,
  signupError: false,
  signupSuccess: false,
  loginOrLogout: 'Login',
};

export const authReducer = createReducer(
  initialState,
  on(loginStatusAction, (state, action) => {
    const isLoginOrLogout = action.token ? 'Logout' : 'Login';
    return {
      ...state,
      token: action.token!,
      loginOrLogout: isLoginOrLogout,
      loginError: action.error!,
    };
  }),

  on(signupStatusAction, (state, action) => {
    return {
      ...state,
      signupSuccess: action.isSuccess,
      signupError: action.isError,
    };
  })

  // on(loginFailureAction, (state, action) => {
  //   return {
  //     ...state,
  //     loginError: action.error,
  //   };
  // })
);
