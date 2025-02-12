import { createReducer, on } from '@ngrx/store';
import { getOrdersAction } from '../actions/orders.action';

export interface State {
  ordersDetails: any;
}

const initialState: State = { ordersDetails: [] };

export const oredersReducer = createReducer(
  initialState,
  on(getOrdersAction, (state, action) => {
    return { ...state, ordersDetails: action.ordersData };
  })
);
