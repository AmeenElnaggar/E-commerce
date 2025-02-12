import { createReducer, on } from '@ngrx/store';
import {
  uiFailureAction,
  startLoadingAction,
  stopLoadingAction,
} from '../actions/ui.actions';

export interface State {
  isLoading: boolean;
  error: boolean;
}

const initialState: State = {
  isLoading: false,
  error: false,
};

export const uiReducer = createReducer(
  initialState,

  on(startLoadingAction, (state, action) => {
    return { ...state, isLoading: true };
  }),

  on(stopLoadingAction, (state, action) => {
    return { ...state, isLoading: false };
  }),

  on(uiFailureAction, (state, action) => {
    return { ...state, error: action.error };
  })
);
