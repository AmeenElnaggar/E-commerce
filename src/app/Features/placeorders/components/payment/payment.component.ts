import { Component, effect, inject, signal } from '@angular/core';
import { CartTotalComponent } from '../../../cart/components/cart-total/cart-total.component';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { RouterLink } from '@angular/router';
import { PaymentMethodService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CartTotalComponent, SectionTitleComponent, RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  private paymentMethodService = inject(PaymentMethodService);

  paymentMethod: string = '';

  constructor() {
    effect(() => {
      this.paymentMethod = this.paymentMethodService.paymentMethod();
    });
  }

  onClick(paymentValue: string) {
    this.paymentMethodService.changePaymentMethod(paymentValue);
  }
}
