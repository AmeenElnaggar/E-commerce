import { createAction, props } from '@ngrx/store';

export const startLoadingAction = createAction('[UI] Start Loading');
export const stopLoadingAction = createAction('[UI] Stop Loading');

export const uiFailureAction = createAction(
  '[ERROR] Error Occurred',
  props<{ error: boolean }>()
);
