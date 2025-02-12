import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-data',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './orders-data.component.html',
  styleUrl: './orders-data.component.css',
})
export class OrdersDataComponent {
  private ordersService = inject(OrdersService);
  savedOrders$: Observable<any> = this.ordersService.savedOrders$;
}
