import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { selectedProductIdAction } from '../../../Store/actions/product.actions';
import { Observable, take } from 'rxjs';
import { Product } from '../../../Shared/models/product.model';
import { selectedProductDataSelector } from '../../../Store/selectors/product.selector';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private store = inject(Store<StoreInterface>);
  private destroyRef = inject(DestroyRef);

  selectedProduct$: Observable<Product> = this.store.select(
    selectedProductDataSelector
  );

  productCoverImage = signal<string>('');

  getProductCoverImage() {
    const subscribtion = this.selectedProduct$.subscribe((product) => {
      this.productCoverImage.set(product.imageCover);
    });

    this.destroyRef.onDestroy(() => {
      subscribtion.unsubscribe();
    });
  }

  selectedProductFn(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((route) => {
      this.store.dispatch(
        selectedProductIdAction({ productId: route['productId'] })
      );
    });
  }
}
