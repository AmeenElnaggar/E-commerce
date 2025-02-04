import { createReducer, on } from '@ngrx/store';
import { Product } from '../../Shared/models/product.model';
import { getAllProducts } from '../actions/products.action';
import { getAllCategoriesAction } from '../actions/categories.action';
import { Category } from '../../Features/collection/models/category.model';

export interface State {
  allProducts: Product[];
  categories: Category[];
}

const initialState: State = { allProducts: [], categories: [] };

export const productsReducer = createReducer(
  initialState,
  on(getAllProducts, (state, action) => {
    const categoriesData = action.payload.map((res) => {
      return { name: res.category!.name, id: res.category!._id };
    });

    const uniqueCategories = (categories: { id: string; name: string }[]) => {
      return Array.from(
        new Map(categories.map((category) => [category.id, category])).values()
      );
    };

    return {
      allProducts: action.payload,
      categories: uniqueCategories(categoriesData),
    };
  })
  // on(getAllCategoriesAction, (state, action) => {
  //   console.log(state);
  //   const x = state.allProducts.map((product) => product.category);
  //   console.log(x);
  //   return state;
  //   // return { ...state, categories: action.categoriesData };
  // })
);
