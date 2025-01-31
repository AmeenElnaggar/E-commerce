import { createAction, props } from '@ngrx/store';
import { User } from '../../Features/authentication/models/user.model';

export const loginAction = createAction(
  '[Auth] Login',
  props<{ userData: User }>()
);

export const signupAction = createAction(
  '[Auth] Signup',
  props<{ userData: User }>()
);

export const authSuccessAction = createAction(
  '[Auth] Success',
  props<{ token: string; user: any }>()
);

export const authFailureAction = createAction(
  '[Auth] Failure',
  props<{ error: any }>()
);
