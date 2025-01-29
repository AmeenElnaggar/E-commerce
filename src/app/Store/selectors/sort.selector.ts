import { StoreInterface } from '../store';

export const sortOptionSelector = (state: StoreInterface) => {
  return state.sort.sortOption;
};
