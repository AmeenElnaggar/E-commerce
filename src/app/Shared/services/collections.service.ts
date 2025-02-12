import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { combineLatest, map, Observable, tap, timer } from 'rxjs';

import {
  modifiedProductsSelector,
  originalCollectionSelector,
  metdaDataSelector,
} from '../../Store/selectors/collections.selector';
import {
  categoriesDataSelector,
  selectedCategoriesSelector,
} from '../../Store/selectors/categories.selector';
import { sortOptionSelector } from '../../Store/selectors/sort.selector';
import { searchValueSelector } from '../../Store/selectors/search.selector';

import { loginStatusAction } from '../../Store/actions/authentication.action';
import { fetchModifiedCollectionAction } from '../../Store/actions/collections.action';
import { MetaData } from '../models/metaData.model';

@Injectable({ providedIn: 'root' })
export class CollectionsService {
  private store = inject(Store);

  originalProducts$: Observable<Product[]> = this.store.select(
    originalCollectionSelector
  );

  modifiedProducts$: Observable<Product[]> = this.store.select(
    modifiedProductsSelector
  );

  metaData = signal<MetaData>({
    currentPage: 1,
    numberOfPages: 1,
    nextPage: 1,
  });

  updateMetaData() {
    this.store.select(metdaDataSelector).subscribe((res: MetaData) => {
      this.metaData.update((prev) => {
        return {
          ...prev,
          numberOfPages: res.numberOfPages,
          currentPage: res.currentPage,
          nextPage: res.nextPage,
        };
      });
    });
  }

  prevPage() {
    if (this.metaData().currentPage > 1) {
      this.metaData.update((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
      this.store.dispatch(
        fetchModifiedCollectionAction({ page: this.metaData().currentPage })
      );
    }
  }
  nextPage() {
    if (this.metaData().currentPage < this.metaData().numberOfPages) {
      this.metaData.update((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
      this.store.dispatch(
        fetchModifiedCollectionAction({ page: this.metaData().currentPage })
      );
    }
  }

  latestProducts$: Observable<Product[]> = this.originalProducts$.pipe(
    map((res) => {
      return [...res.slice(23, 33)];
    })
  );

  bestProducts$: Observable<Product[]> = this.originalProducts$.pipe(
    map((products) =>
      [...products]
        .filter((product) => product.ratingsAverage! >= 4.8)
        .slice(6, 11)
    )
  );

  categories$ = this.store.select(categoriesDataSelector);

  filteredSortOptions$: Observable<string> =
    this.store.select(sortOptionSelector);

  searchValue$: Observable<string> = this.store.select(searchValueSelector);

  sortedProductsBySortOptions$ = combineLatest(
    this.modifiedProducts$,
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
}
