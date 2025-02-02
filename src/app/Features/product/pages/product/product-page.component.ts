import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../../../../Shared/spinner/spinner.component';
import { ProductDescReviewsComponent } from '../../components/product-desc-reviews/product-desc-reviews.component';
import { ProductImagesComponent } from '../../components/product-images/product-images.component';
import { ProductInfoComponent } from '../../components/product-info/product-info.component';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';
import { AllProductsService } from '../../../../Shared/services/allProducts.service';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { selectAuthUserSelector } from '../../../../Store/selectors/authentication.selector';
import { selectedProductDataSelector } from '../../../../Store/selectors/product.selector';

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
  private allProductsService = inject(AllProductsService);
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private store = inject(Store<StoreInterface>);

  isLoading = this.allProductsService.isLoading;
  error = this.allProductsService.error;
  pageIsLoading = signal<boolean>(true);

  ngOnInit() {
    this.productService.selectedProductFn(this.activatedRoute);
    this.allProductsService.isLoadingAndErrorStatus();
  }
}
