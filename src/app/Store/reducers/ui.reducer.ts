import { createReducer, on } from '@ngrx/store';
import { isError, startLoading, stopLoading } from '../actions/ui.actions';

export interface State {
  isLoading: boolean;
  error: string;
}

const initialState: State = {
  isLoading: false,
  error: '',
};

export const uiReducer = createReducer(
  initialState,

  on(startLoading, (state, action) => {
    return { isLoading: true, error: '' };
  }),

  on(stopLoading, (state, action) => {
    return { isLoading: false, error: '' };
  }),

  on(isError, (state, action) => {
    return { isLoading: false, error: action.errorMsg };
  })
);
