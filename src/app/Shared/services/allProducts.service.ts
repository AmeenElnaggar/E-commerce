import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { combineLatest, map, Observable } from 'rxjs';

import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { allProductsSelector } from '../../Store/selectors/products.selector';
import { selectedCategoriesSelector } from '../../Store/selectors/categories.selector';
import { sortOptionSelector } from '../../Store/selectors/sort.selector';
import { searchValueSelector } from '../../Store/selectors/search.selector';

@Injectable({ providedIn: 'root' })
export class AllProductsService {
  private fireStore = inject(Firestore);
  private store = inject(Store);

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
}
