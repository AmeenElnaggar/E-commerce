import { createAction, props } from '@ngrx/store';
import { User } from '../../Features/authentication/models/user.model';

// 1
export const loginAction = createAction(
  '[Auth] Login',
  props<{ userData: User }>()
);

// 2
export const loginStatusAction = createAction(
  '[Auth] Login Success',
  props<{ token: string; error: boolean }>()
);

// ---------------------------------------

export const signupAction = createAction(
  '[Auth] Signup',
  props<{ userData: User }>()
);

export const signupStatusAction = createAction(
  '[Auth] Signup Success',
  props<{ isSuccess: boolean; isError: boolean }>()
);
