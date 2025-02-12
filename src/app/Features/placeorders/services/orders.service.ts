import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { fetchOrdersAction } from '../../../Store/actions/orders.action';
import { filter, map, Observable, take } from 'rxjs';
import { ordersSelector } from '../../../Store/selectors/orders.selector';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private store = inject(Store<StoreInterface>);

  savedOrders$: Observable<any> = this.store.select(ordersSelector).pipe(
    filter((orders) => orders.length !== 0),
    map((orders: any) =>
      orders.flatMap((order: any) => {
        const productsDetails = order.cartItems.map((products: any) => ({
          date: order.createdAt,
          paymentMethod: order.paymentMethodType,
          quantity: products.count,
          price: products.price,
          imageCover: products.product.imageCover,
          title: products.product.title,
        }));

        return productsDetails;
      })
    )
  );

  fetchUserOrders() {
    this.store.dispatch(fetchOrdersAction());
  }
}
