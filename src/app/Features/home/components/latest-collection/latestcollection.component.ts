import { Component, effect, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';
import { Store } from '@ngrx/store';
import { productsSelector } from '../../../../Store/selectors/products.selector';
import { map, Observable } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
import { StoreInterface } from '../../../../Store/store';
import { AsyncPipe } from '@angular/common';
import { ProductsService } from '../../../../Shared/services/products.service';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';

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
  private productService = inject(ProductsService);

  isFetching = this.productService.isFetching;
  error = this.productService.errorMessage;

  products$: Observable<Product[]> = this.store
    .select(productsSelector)
    .pipe(map((products) => [...products].slice(23, 33)));
}
