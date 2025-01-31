import { createReducer, on } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';
import { cartAction } from '../actions/cart.action';

export interface State {
  cartProducts: Product[];
}

const initialState: State = {
  cartProducts: [],
};

export const cartReducer = createReducer(
  initialState,
  on(cartAction, (state, action) => {
    console.log(action.payload);
    return { ...state, cartProducts: action.payload };
  })
);
