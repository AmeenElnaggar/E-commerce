import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
import { StoreInterface } from '../../../../Store/store';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../../Shared/spinner/spinner.component';
import { allProductsSelector } from '../../../../Store/selectors/products.selector';
import {
  spinnerOfUiSelector,
  errorOfUiSelector,
} from '../../../../Store/selectors/ui.selector';
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
  private store = inject(Store<StoreInterface>);
  private allProductsService = inject(AllProductsService);

  isLoading$: Observable<boolean> = this.store.select(spinnerOfUiSelector);
  error$: Observable<string> = this.store.select(errorOfUiSelector);

  latestProducts$: Observable<Product[]> =
    this.allProductsService.latestProducts$;
}
