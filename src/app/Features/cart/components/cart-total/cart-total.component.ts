import { Component, DestroyRef, inject, signal } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../../Shared/models/product.model';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Cart, TotalPrice } from '../../models/cart.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [SectionTitleComponent, CurrencyPipe, AsyncPipe, NgIf],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.css',
})
export class CartTotalComponent {
  private cartService = inject(CartService);

  cartTotal$: Observable<TotalPrice> = this.cartService.comparedCarts$.pipe(
    map((response) => response.cartTotalPrice)
  );
}
