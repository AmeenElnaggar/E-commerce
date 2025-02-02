import { Component, inject } from '@angular/core';
import { Product } from '../../../../Shared/models/product.model';

import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent {
  private productService = inject(ProductService);
  private cartservice = inject(CartService);
  selectedProduct$: Observable<Product> = this.productService.selectedProduct$;

  addToCart() {
    this.cartservice.addProductToLocalStorage();
    this.cartservice.startFetchCartProductsFromLS();
    this.cartservice.addProductToLoggedUser();
  }
}
