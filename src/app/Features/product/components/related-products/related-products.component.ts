import { Component, inject, input, signal } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';
import { Product } from '../../../../Shared/models/product.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { Observable } from 'rxjs';
import { relatedProductsSelector } from '../../../../Store/selectors/product.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [SectionTitleComponent, ProductItemComponent, AsyncPipe],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent {
  private store = inject(Store<StoreInterface>);
  private router = inject(Router);

  selectedProduct = input.required<Product>();
  releatedProducts$: Observable<Product[]> = this.store.select(
    relatedProductsSelector
  );

  navigateToProduct(productId: string) {
    this.router.navigate(['product', productId]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
