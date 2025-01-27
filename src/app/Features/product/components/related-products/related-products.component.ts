import { Component, inject, input, signal } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';
import { ProductsService } from '../../../../Shared/services/products.service';
import { Product } from '../../../../Shared/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [SectionTitleComponent, ProductItemComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  selectedProduct = input.required<Product>();
  releatedProducts = signal<Product[]>([]);

  ngOnInit() {
    this.releatedProducts.set(
      this.productsService
        .getOriginalProducts()
        .filter((product) => {
          return (
            product.category?.name === this.selectedProduct().category?.name
          );
        })
        .slice(0, 5)
    );
  }

  navigateToProduct(productId: string) {
    this.router.navigate(['product', productId]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
