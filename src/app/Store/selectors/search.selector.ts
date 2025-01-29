import { StoreInterface } from '../store';

export const searchValueSelector = (state: StoreInterface) => {
  return state.search.searchValue;
};

export const searchBarVisisbleSelector = (state: StoreInterface) => {
  return state.search.searchBarIsVisible;
};
