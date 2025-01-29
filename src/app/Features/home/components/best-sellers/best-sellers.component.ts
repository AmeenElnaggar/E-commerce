import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';

import { AsyncPipe } from '@angular/common';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { map, Observable } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
import { allProductsSelector } from '../../../../Store/selectors/products.selector';
import { SpinnerComponent } from '../../../../Shared/spinner/spinner.component';
import {
  errorOfUiSelector,
  spinnerOfUiSelector,
} from '../../../../Store/selectors/ui.selector';
import { AllProductsService } from '../../../../Shared/services/allProducts.service';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [
    SectionTitleComponent,
    AsyncPipe,
    ProductItemComponent,
    SpinnerComponent,
  ],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css',
})
export class BestSellersComponent {
  private store = inject(Store<StoreInterface>);
  private allProductsService = inject(AllProductsService);

  isLoading$: Observable<boolean> = this.store.select(spinnerOfUiSelector);
  error$: Observable<string> = this.store.select(errorOfUiSelector);

  bestProducts$: Observable<Product[]> = this.allProductsService.bestProducts$;
}
