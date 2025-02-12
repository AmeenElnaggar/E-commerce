import { StoreInterface } from '../store';

export const ordersSelector = (state: StoreInterface) => {
  return state.orders.ordersDetails;
};
