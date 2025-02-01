import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { combineLatest, map, Observable } from 'rxjs';

import { allProductsSelector } from '../../Store/selectors/products.selector';
import { selectedCategoriesSelector } from '../../Store/selectors/categories.selector';
import { sortOptionSelector } from '../../Store/selectors/sort.selector';
import { searchValueSelector } from '../../Store/selectors/search.selector';
import {
  errorOfUiSelector,
  spinnerOfUiSelector,
} from '../../Store/selectors/ui.selector';

@Injectable({ providedIn: 'root' })
export class AllProductsService {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  allProducts$: Observable<Product[]> = this.store.select(allProductsSelector);

  latestProducts$: Observable<Product[]> = this.allProducts$.pipe(
    map((res) => [...res.slice(23, 33)])
  );

  bestProducts$: Observable<Product[]> = this.allProducts$.pipe(
    map((products) =>
      [...products]
        .filter((product) => product.ratingsAverage! >= 4.8)
        .slice(6, 11)
    )
  );

  filterdCategories$: Observable<string[]> = this.store.select(
    selectedCategoriesSelector
  );

  filteredProductsByCategory$ = combineLatest(
    this.allProducts$,
    this.filterdCategories$
  ).pipe(
    map(([products, selectedCategories]) => {
      if (selectedCategories.length === 0) {
        return products;
      }
      return products.filter((product) =>
        selectedCategories.includes(product.category!._id)
      );
    })
  );

  filteredSortOptions$: Observable<string> =
    this.store.select(sortOptionSelector);

  searchValue$: Observable<string> = this.store.select(searchValueSelector);

  sortedProductsBySortOptions$ = combineLatest(
    this.filteredProductsByCategory$,
    this.filteredSortOptions$,
    this.searchValue$
  ).pipe(
    map(([products, sortOption, searchValue]) => {
      const productsWithSearch = [...products].filter((product) =>
        product.title.toLowerCase().includes(searchValue)
      );
      switch (sortOption) {
        case 'highToLow':
          return [...productsWithSearch].sort((a, b) => b.price - a.price);

        case 'lowToHigh':
          return [...productsWithSearch].sort((a, b) => a.price - b.price);

        default:
          return [...productsWithSearch];
      }
    })
  );

  isLoading = signal<boolean>(true);
  error = signal<string>('');

  isLoadingAndErrorStatus() {
    const subscribtionOfLoading = this.store
      .select(spinnerOfUiSelector)
      .subscribe((res) => this.isLoading.set(res));

    const subscribtionOfError = this.store
      .select(errorOfUiSelector)
      .subscribe((res) => this.error.set(res));

    this.destroyRef.onDestroy(() => {
      subscribtionOfLoading.unsubscribe();
      subscribtionOfError.unsubscribe();
    });
  }
}
