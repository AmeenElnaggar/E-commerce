import { Component, effect, inject, signal } from '@angular/core';
import { CartTotalComponent } from '../../../cart/components/cart-total/cart-total.component';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../../cart/services/cart.service';
import { Observable, count } from 'rxjs';
import { PaymentDetails } from '../../models/payment.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CartTotalComponent, SectionTitleComponent, RouterLink, AsyncPipe],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  private paymentService = inject(PaymentService);
  private cartService = inject(CartService);

  customerForm$: Observable<any> = this.paymentService.getForm();
  paymentMethod: string = '';

  constructor() {
    effect(() => {
      this.paymentMethod = this.paymentService.paymentMethod();
    });
  }

  onChoosePayment(paymentValue: string) {
    this.paymentService.changePaymentMethod(paymentValue);
  }

  onPlaceOrder() {
    this.paymentService.placeOrder();
  }
}
