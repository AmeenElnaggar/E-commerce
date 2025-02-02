import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
import { CartService } from '../../../cart/services/cart.service';
import { PaymentMethodService } from '../../services/payment.service';

@Component({
  selector: 'app-orders-data',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './orders-data.component.html',
  styleUrl: './orders-data.component.css',
})
export class OrdersDataComponent {
  private cartService = inject(CartService);
  private paymentMethodService = inject(PaymentMethodService);

  savedProducts$: Observable<any> = this.cartService.savedProductsOfLoggedUser$;
  paymentMethod: string = '';

  constructor() {
    effect(() => {
      this.paymentMethod = this.paymentMethodService.paymentMethod();
    });
  }
  ProductDate(product: Product) {
    return this.cartService.getProductDate(product);
  }
}
