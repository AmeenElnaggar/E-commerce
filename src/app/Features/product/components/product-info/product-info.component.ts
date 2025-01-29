import { Component, input } from '@angular/core';
import { Product } from '../../../../Shared/models/product.model';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent {
  selectedProduct = input.required<Product>();

  addToCart() {}
}
