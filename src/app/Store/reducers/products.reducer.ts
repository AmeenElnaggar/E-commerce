import { createReducer, on } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';
import { getProducts } from '../actions/products.action';

export interface State {
  allProducts: Product[];
}

const initialState: State = { allProducts: [] };

export const productsReducer = createReducer(
  initialState,
  on(getProducts, (state, action) => {
    console.log(action.products);
    return { ...state, allProducts: action.products };
  })
);
