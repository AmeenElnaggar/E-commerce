import { createAction, props } from '@ngrx/store';

export const startLoading = createAction('[UI] Start Loading');
export const stopLoading = createAction('[UI] Stop Loading');
export const isError = createAction(
  '[ERROR] Error Occurred',
  props<{ errorMsg: string }>()
);
