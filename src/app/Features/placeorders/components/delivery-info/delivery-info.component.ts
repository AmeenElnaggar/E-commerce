import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { CartTotalComponent } from '../../../cart/components/cart-total/cart-total.component';
import { Store } from '@ngrx/store';
import {
  getCartFromLSAction,
  getUserCartAction,
  // onLoadCartFromLSAction,
} from '../../../../Store/actions/cart.action';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { filter, map, take } from 'rxjs';

@Component({
  selector: 'app-delivery-info',
  standalone: true,
  imports: [SectionTitleComponent, ReactiveFormsModule],
  templateUrl: './delivery-info.component.html',
  styleUrl: './delivery-info.component.css',
})
export class DeliveryInfoComponent {
  private paymentService = inject(PaymentService);
  private store = inject(Store);

  myForm = new FormGroup({
    city: new FormControl('', { validators: [Validators.required] }),
    phone: new FormControl('', { validators: [Validators.required] }),
    street: new FormControl('', { validators: [Validators.required] }),
    country: new FormControl('', { validators: [Validators.required] }),
  });

  ngOnInit() {
    this.paymentService.customerFormInfo(this.myForm);
  }
}
