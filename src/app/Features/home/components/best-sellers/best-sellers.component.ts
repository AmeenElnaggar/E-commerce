import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { ProductsService } from '../../../../Shared/services/products.service';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { productsSelector } from '../../../../Store/selectors/products.selector';
import { map, Observable } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
import { AsyncPipe } from '@angular/common';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [
    SectionTitleComponent,
    SpinnerComponent,
    AsyncPipe,
    ProductItemComponent,
  ],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css',
})
export class BestSellersComponent {
  private productService = inject(ProductsService);
  private store = inject(Store<StoreInterface>);

  bestProducts$: Observable<Product[]> = this.store
    .select(productsSelector)
    .pipe(
      map((products) =>
        products
          .filter((product) => product.ratingsAverage! >= 4.8)
          .slice(6, 11)
      )
    );

  isFetching = this.productService.isFetching;
  error = this.productService.errorMessage;
}
