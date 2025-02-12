import { Component, inject } from '@angular/core';
import { CartService } from '../../../cart/services/cart.service';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { OrdersDataComponent } from '../../components/orders-data/orders-data.component';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SectionTitleComponent, OrdersDataComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private ordersService = inject(OrdersService);

  ngOnInit() {
    this.ordersService.fetchUserOrders();
  }
}
