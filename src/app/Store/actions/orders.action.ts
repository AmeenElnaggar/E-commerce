import { createAction, props } from '@ngrx/store';
import { Cart } from '../../Features/cart/models/cart.model';

export const fetchOrdersAction = createAction('[Orders] Fetch User Orders');

export const getOrdersAction = createAction(
  '[Orders] Get User Orders',
  props<{ ordersData: any }>()
);
