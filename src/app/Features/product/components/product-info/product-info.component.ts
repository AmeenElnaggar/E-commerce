import { Component, inject, input } from '@angular/core';
import { Product } from '../../../../Shared/models/product.model';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent {
  private store = inject(Store<StoreInterface>);
  private router = inject(Router);
  selectedProduct = input.required<Product>();

  addToCart() {
    this.router.navigate(['/cart'], { replaceUrl: true });
  }
}
