import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { getProducts } from '../../Store/actions/products.action';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private store = inject(Store);
  private httpClient = inject(HttpClient);
  private originalProducts = signal<Product[]>([]);
  allProducts = signal<Product[]>([]);

  isFetching = signal<boolean>(true);
  errorMessage = signal<string>('');

  selectedSortedValueChange = signal<string>('relevant');

  productsFilters = signal<string[]>([]);

  searchValue = signal<string>('');

  fetchProducts() {
    this.httpClient
      .get<{ data: Product[] }>(
        'https://ecommerce.routemisr.com/api/v1/products'
      )
      .pipe(
        catchError((error) =>
          throwError(
            () =>
              new Error(
                'Something went wrong fetching the avaliable collections 💥💥. Please try again later.'
              )
          )
        )
      )
      .subscribe({
        next: (res) => {
          this.store.dispatch(getProducts({ products: res.data }));
          this.originalProducts.set(res.data);
          this.allProducts.set(res.data);
          this.isFetching.set(true);
        },
        error: (error: Error) => {
          this.isFetching.set(false);
          this.errorMessage.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
  }

  sortProducts() {
    let filteredProducts = this.getFilteredProducts();

    switch (this.selectedSortedValueChange()) {
      case 'lowToHigh':
        filteredProducts = [...filteredProducts].sort(
          (a, b) => a.price - b.price
        );
        break;
      case 'highToLow':
        filteredProducts = [...filteredProducts].sort(
          (a, b) => b.price - a.price
        );
        break;
      default:
        filteredProducts = this.getFilteredProducts();
        break;
    }

    this.allProducts.set(filteredProducts);
  }

  onSelectedSortedValueChanges(value: string) {
    this.selectedSortedValueChange.set(value);
    this.sortProducts();
  }

  toggleCategory(checkValue: string) {
    if (this.productsFilters().includes(checkValue)) {
      this.productsFilters.update((prevFilters) =>
        [...prevFilters].filter((res) => res !== checkValue)
      );
    } else {
      this.productsFilters().push(checkValue);
    }
    this.sortProducts();
  }

  getFilteredProducts() {
    let filteredProducts = this.originalProducts();

    if (this.productsFilters().length > 0) {
      filteredProducts = this.productsFilters()
        .map((fil) =>
          this.originalProducts().filter(
            (product) => product.category?.name === fil
          )
        )
        .flat(1);
    }

    if (this.searchValue().trim()) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(this.searchValue().toLowerCase())
      );
    }

    return filteredProducts;
  }

  updateSearchValue(search: string) {
    this.searchValue.set(search);
    this.sortProducts();
  }
}
