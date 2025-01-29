import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { AllProductsService } from '../../../../Shared/services/allProducts.service';
import { map, Observable, tap } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
import {
  spinnerOfUiSelector,
  errorOfUiSelector,
} from '../../../../Store/selectors/ui.selector';
import { SpinnerComponent } from '../../../../Shared/spinner/spinner.component';
import { sortOptionsAction } from '../../../../Store/actions/sort.action';

@Component({
  selector: 'app-relevant-collections',
  standalone: true,
  imports: [
    SectionTitleComponent,
    FormsModule,
    AsyncPipe,
    ProductItemComponent,
    SpinnerComponent,
  ],
  templateUrl: './relevant-collections.component.html',
  styleUrl: './relevant-collections.component.css',
  host: {
    class: 'flex-1',
  },
})
export class RelevantCollectionsComponent {
  private store = inject(Store<StoreInterface>);
  private allProductsService = inject(AllProductsService);

  isLoading$: Observable<boolean> = this.store.select(spinnerOfUiSelector);
  error$: Observable<string> = this.store.select(errorOfUiSelector);
  products$: Observable<Product[]> =
    this.allProductsService.sortedProductsBySortOptions$;

  onSelectSortOptions(sortOptionValue: string) {
    this.store.dispatch(sortOptionsAction({ sortOption: sortOptionValue }));
  }
}
