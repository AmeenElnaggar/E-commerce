import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { CartTotalComponent } from '../../../cart/components/cart-total/cart-total.component';
import { Store } from '@ngrx/store';
import {
  getProductsFromLSAction,
  onLoadCartFromLSAction,
} from '../../../../Store/actions/cart.action';

@Component({
  selector: 'app-delivery-info',
  standalone: true,
  imports: [SectionTitleComponent],
  templateUrl: './delivery-info.component.html',
  styleUrl: './delivery-info.component.css',
})
export class DeliveryInfoComponent {
  private store = inject(Store);
  ngOnInit() {
    this.store.dispatch(onLoadCartFromLSAction());
  }
}
