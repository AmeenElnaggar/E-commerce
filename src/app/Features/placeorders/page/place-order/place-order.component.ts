import { Component, inject } from '@angular/core';
import { CartService } from '../../../cart/services/cart.service';
import { DeliveryInfoComponent } from '../../components/delivery-info/delivery-info.component';
import { PaymentComponent } from '../../components/payment/payment.component';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [DeliveryInfoComponent, PaymentComponent],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css',
})
export class PlaceOrderComponent {
  private paymentService = inject(PaymentService);

  // ngOnInit() {
  //   this.paymentService.fetchPaymentDetails();
  // }
}
