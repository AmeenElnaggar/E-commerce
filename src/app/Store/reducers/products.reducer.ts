import { createReducer, on } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';
import { getAllProducts } from '../actions/products.action';

export interface State {
  allProducts: Product[];
}

const initialState: State = { allProducts: [] };

export const productsReducer = createReducer(
  initialState,
  on(getAllProducts, (state, action) => {
    return { allProducts: action.payload };
  })
);
