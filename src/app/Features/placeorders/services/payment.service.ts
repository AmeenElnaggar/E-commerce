import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentMethodService {
  paymentMethod = signal<string>('COD');

  changePaymentMethod(paymentValue: string) {
    if (paymentValue === 'stripe') this.paymentMethod.set('stripe');
    if (paymentValue === 'razorpay') this.paymentMethod.set('razorpay');
    if (paymentValue === 'cod') this.paymentMethod.set('cod');
  }
}
