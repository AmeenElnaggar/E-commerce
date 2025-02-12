import { Component, inject } from '@angular/core';
import { Product } from '../../../../Shared/models/product.model';

import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  selectedProduct$: Observable<Product> = this.productService.selectedProduct$;

  addToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }
}
