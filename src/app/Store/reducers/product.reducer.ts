import { createReducer, on, Store } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';
import { selectedProductAction } from '../actions/product.actions';

export interface State {
  selectedProductId: string;
}

const intialState: State = {
  selectedProductId: '',
};

export const selectedProductReducer = createReducer(
  intialState,
  on(selectedProductAction, (state, action) => {
    return { selectedProductId: action.productId };
  })
);
