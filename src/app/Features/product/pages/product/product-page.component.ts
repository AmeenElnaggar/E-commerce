import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { ProductDescReviewsComponent } from '../../components/product-desc-reviews/product-desc-reviews.component';
import { ProductImagesComponent } from '../../components/product-images/product-images.component';
import { ProductInfoComponent } from '../../components/product-info/product-info.component';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';
// import { AllProductsService } from '../../../../Shared/services/allProducts.service';
import { ProductService } from '../../services/product.service';
import { UiService } from '../../../../Shared/services/ui.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
// import { Store } from '@ngrx/store';
// import { StoreInterface } from '../../../../Store/store';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    ProductImagesComponent,
    ProductInfoComponent,
    ProductDescReviewsComponent,
    RelatedProductsComponent,
    SpinnerComponent,
    AsyncPipe,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private uiService = inject(UiService);

  isLoading$: Observable<boolean> = this.uiService.isLoading$;
  isError$: Observable<boolean> = this.uiService.isError$;

  ngOnInit() {
    this.productService.selectedProductFn(this.activatedRoute);
  }
}
