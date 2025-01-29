import { createAction, props } from '@ngrx/store';

export const searchValueAction = createAction(
  '[Search] Get Search Value',
  props<{ searchValue: string }>()
);

export const searchBarVisibleAction = createAction(
  '[SearchBar] SearchBar Visible'
);
