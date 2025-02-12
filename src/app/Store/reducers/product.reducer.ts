import { createReducer, on, Store } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';
import {
  getSelectedProductDataAction,
  selectedProductIdAction,
} from '../actions/product.actions';

export interface State {
  selectedProductId: string;
  selectedProductData: Product;
}

const intialState: State = {
  selectedProductId: '',
  selectedProductData: { id: '', price: 0, title: '', imageCover: '' },
};

export const selectedProductReducer = createReducer(
  intialState,
  on(getSelectedProductDataAction, (state, action) => {
    return { ...state, selectedProductData: action.productData };
  })
);
