import { createReducer, on } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';
import { getAllProducts } from '../actions/products.action';
import {
  searchBarVisibleAction,
  searchValueAction,
} from '../actions/search.action';

export interface State {
  searchValue: string;
  searchBarIsVisible: boolean;
}

const initialState: State = { searchValue: '', searchBarIsVisible: false };

export const searchValueReducer = createReducer(
  initialState,
  on(searchValueAction, (state, action) => {
    return { ...state, searchValue: action.searchValue };
  }),
  on(searchBarVisibleAction, (state, action) => {
    return { ...state, searchBarIsVisible: !state.searchBarIsVisible };
  })
);
