import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../../../../Shared/spinner/spinner.component';
import { ProductDescReviewsComponent } from '../../components/product-desc-reviews/product-desc-reviews.component';
import { ProductImagesComponent } from '../../components/product-images/product-images.component';
import { ProductInfoComponent } from '../../components/product-info/product-info.component';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { selectedProductAction } from '../../../../Store/actions/product.actions';
import { Observable } from 'rxjs';
import {
  errorOfUiSelector,
  spinnerOfUiSelector,
} from '../../../../Store/selectors/ui.selector';
import { AsyncPipe } from '@angular/common';
import { Product } from '../../../../Shared/models/product.model';
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
    AsyncPipe,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  private store = inject(Store<StoreInterface>);
  private activatedRoute = inject(ActivatedRoute);

  isLoading$: Observable<boolean> = this.store.select(spinnerOfUiSelector);
  isError$: Observable<string> = this.store.select(errorOfUiSelector);
  selectedProduct$: Observable<Product> = this.store.select(
    selectedProductDataSelector
  );

  ngOnInit() {
    this.activatedRoute.params.subscribe((route) => {
      this.store.dispatch(
        selectedProductAction({ productId: route['productId'] })
      );
    });
  }
}
