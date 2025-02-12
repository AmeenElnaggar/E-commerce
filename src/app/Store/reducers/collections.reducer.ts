import { createReducer, on } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';
import {
  getOriginalProductsAction,
  getModifiedProductsAction,
} from '../actions/collections.action';
import { MetaData } from '../../Shared/models/metaData.model';

export interface State {
  modifiedProducts: Product[];
  originalProducts: Product[];
  categories: { id: string; name: string }[];
  metaData: MetaData;
}

const initialState: State = {
  modifiedProducts: [],
  metaData: { currentPage: 1, numberOfPages: 1 },
  originalProducts: [],
  categories: [],
};

export const collectionReducer = createReducer(
  initialState,

  on(getOriginalProductsAction, (state, action) => {
    // Get Info Of Each Category
    const categoriesData = action.payload.map((product) => {
      return {
        name: product.category!.name,
        id: product.category!._id,
      };
    });

    // Get unique categories
    const uniqueCategories = (categories: { id: string; name: string }[]) => {
      return Array.from(
        new Map(categories.map((category) => [category.id, category])).values()
      );
    };

    return {
      ...state,
      originalProducts: action.payload,
      categories: uniqueCategories(categoriesData),
    };
  }),
  on(getModifiedProductsAction, (state, action) => ({
    ...state,
    metaData: action.metaData,
    modifiedProducts: action.payload,
  }))
);
