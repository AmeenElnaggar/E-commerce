import { StoreInterface } from '../store';

export const originalCollectionSelector = (state: StoreInterface) => {
  return state.collection.originalProducts;
};

export const modifiedProductsSelector = (state: StoreInterface) => {
  return state.collection.modifiedProducts;
};

export const metdaDataSelector = (state: StoreInterface) => {
  return state.collection.metaData;
};
