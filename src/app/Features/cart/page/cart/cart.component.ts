import { Component, inject } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { CartEmptyComponent } from '../../components/cart-empty/cart-empty.component';
import { CartProductsComponent } from '../../components/cart-products/cart-products.component';
import { CartEmptyDirective } from '../../directives/cartEmpty.directive';
import { CartTotalComponent } from '../../components/cart-total/cart-total.component';
import { CartNotEmptyDirective } from '../../directives/cartNotEmpty.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartEmptyComponent,
    CartProductsComponent,
    CartEmptyDirective,
    CartNotEmptyDirective,
    CartTotalComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit() {
    this.cartService.startFetchCartProductsFromLS();
  }

  onCheckout() {
    this.router.navigate(['place-orders'], { replaceUrl: true });
  }
}
