import { Component, inject } from '@angular/core';
import { CartService } from '../../../cart/services/cart.service';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { OrdersDataComponent } from '../../components/orders-data/orders-data.component';
import { CartEmptyComponent } from '../../../../Shared/components/cartEmpty/cart-empty.component';
import { OrdersEmptyDirective } from '../../directives/ordersEmpty.directive';
import { OrdersNotEmptyDirective } from '../../directives/ordersNotEmpty.directive';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    SectionTitleComponent,
    OrdersDataComponent,
    CartEmptyComponent,
    OrdersEmptyDirective,
    OrdersNotEmptyDirective,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private cartService = inject(CartService);

  ngOnInit() {
    this.cartService.loadProductsOfLoggedUser();
  }
}
