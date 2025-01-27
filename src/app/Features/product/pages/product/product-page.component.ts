import { Component, effect, inject, input } from '@angular/core';
import { ProductImagesComponent } from '../../components/product-images/product-images.component';
import { ProductInfoComponent } from '../../components/product-info/product-info.component';
import { ProductDescReviewsComponent } from '../../components/product-desc-reviews/product-desc-reviews.component';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../Shared/models/product.model';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    ProductImagesComponent,
    ProductInfoComponent,
    ProductDescReviewsComponent,
    RelatedProductsComponent,
    SpinnerComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  productData?: Product;

  constructor() {
    effect(() => {
      this.productData = this.productService.selectedProductData();
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.productService.getProductIdFromActiveLink(res['productId']);
    });
  }
}
