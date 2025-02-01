import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { cartSelector } from '../../../../Store/selectors/cart.selector';
import { loadCartAction } from '../../../../Store/actions/cart.action';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private store = inject(Store<StoreInterface>);
  ngOnInit() {
    this.store.dispatch(loadCartAction());
  }
}
