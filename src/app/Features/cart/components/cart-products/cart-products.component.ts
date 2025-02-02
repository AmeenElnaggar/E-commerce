import { Component, inject, signal } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../../Shared/models/product.model';
import { AsyncPipe } from '@angular/common';
import { count } from 'rxjs';
@Component({
  selector: 'app-cart-products',
  standalone: true,
  imports: [SectionTitleComponent, AsyncPipe],
  templateUrl: './cart-products.component.html',
  styleUrl: './cart-products.component.css',
})
export class CartProductsComponent {
  private cartService = inject(CartService);
  savedProducts = this.cartService.savedProductsFromLS$;

  onChangeCount(event: Event, selectedProduct: Product) {
    const quantityInput = event.target as HTMLInputElement;
    this.cartService.updateCount(+quantityInput.value, selectedProduct);
  }

  onDeleteProduct(selectedProduct: Product) {
    this.cartService.deleteProduct(selectedProduct);
  }
}
