import { Component, inject, signal } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../../Shared/models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [SectionTitleComponent, CurrencyPipe],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.css',
})
export class CartTotalComponent {
  private cartService = inject(CartService);

  subTotal = signal<number>(0);
  shippingFee = signal<number>(0);
  totalPrice = signal<number>(0);

  ngOnInit() {
    this.cartService.savedProductsFromLS$.subscribe((products: Product[]) => {
      if (products.length > 0) {
        this.subTotal.set(
          products.reduce((acc, ele) => {
            return acc + +ele.count! * ele.price;
          }, 0)
        );
        this.totalPrice.set(this.subTotal() + 10);
        this.shippingFee.set(10);
      } else {
        this.subTotal.set(0);
        this.totalPrice.set(0);
        this.shippingFee.set(0);
      }
    });
  }
}
