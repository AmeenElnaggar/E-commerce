import { inject, Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
// import { CartService } from '../../cart/services/cart.service';
// import { Observable, timer } from 'rxjs';
// import { paymentDetailsSelector } from '../../../Store/selectors/cart.selector';
// import { PaymentDetails } from '../models/payment.model';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { DeliveryDetails, PaymentDetails } from '../models/payment.model';
import { fetchPaymentDataAction } from '../../../Store/actions/cart.action';
import { paymentDetailsSelector } from '../../../Store/selectors/cart.selector';
// import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private store = inject(Store<StoreInterface>);
  private formSubject = new BehaviorSubject<FormGroup | null>(null);

  paymentMethod = signal<string>('');
  paymentDetails$: Observable<any> = this.store.select(paymentDetailsSelector);

  customerFormInfo(form: FormGroup) {
    this.formSubject.next(form);
  }

  getForm(): Observable<FormGroup | null> {
    return this.formSubject.asObservable();
  }

  changePaymentMethod(paymentValue: string) {
    if (paymentValue === 'stripe') this.paymentMethod.set('stripe');
    if (paymentValue === 'cod') this.paymentMethod.set('cod');
  }

  fetchPaymentDetails(deliveryDetails: DeliveryDetails) {
    this.store.dispatch(
      fetchPaymentDataAction({
        customerInfo: deliveryDetails,
        paymentMethod: this.paymentMethod(),
      })
    );
  }

  placeOrder() {
    this.getForm().subscribe((response: any) => {
      const controlsValues: any = response.value;
      this.fetchPaymentDetails({
        city: controlsValues.city,
        details: `${controlsValues.street} - ${controlsValues.city} - ${controlsValues.country}`,
        phone: controlsValues.phone,
      });
    });
    this.paymentDetails$.subscribe((response: any) => {
      if (this.paymentMethod() === 'stripe') {
        if (response.status === 'success') {
          console.log(response);
          window.open(`${response.session.url}`);
        }
      }
    });
  }
}
