import { createReducer, on } from '@ngrx/store';
import { sortOptionsAction } from '../actions/sort.action';

export interface State {
  sortOption: string;
}

const initialState: State = {
  sortOption: 'relevant',
};

export const sortOptionsReducer = createReducer(
  initialState,
  on(sortOptionsAction, (state, action) => {
    return { sortOption: action.sortOption };
  })
);
