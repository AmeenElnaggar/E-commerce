import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';
import { Observable } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../../Shared/spinner/spinner.component';

import { AllProductsService } from '../../../../Shared/services/allProducts.service';

@Component({
  selector: 'app-latest-collection',
  standalone: true,
  imports: [
    SectionTitleComponent,
    ProductItemComponent,
    AsyncPipe,
    SpinnerComponent,
  ],
  templateUrl: './latestcollection.component.html',
  styleUrl: './latestcollection.component.css',
})
export class LatestcollectionComponent {
  private allProductsService = inject(AllProductsService);

  isLoading = this.allProductsService.isLoading;
  error = this.allProductsService.error;

  latestProducts$: Observable<Product[]> =
    this.allProductsService.latestProducts$;

  ngOnInit() {
    this.allProductsService.isLoadingAndErrorStatus();
  }
}
