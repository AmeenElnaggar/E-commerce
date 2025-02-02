import {
  DestroyRef,
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { loadCartProductsFromLSSelector } from '../../../Store/selectors/cart.selector';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { take } from 'rxjs';

@Directive({
  selector: '[cartNotEmpty]',
  standalone: true,
})
export class CartNotEmptyDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private store = inject(Store<StoreInterface>);
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    this.cartIsEmpty();
  }

  private cartIsEmpty() {
    const subscribtion = this.store
      .select(loadCartProductsFromLSSelector)
      .pipe(take(1))
      .subscribe((loadedProducts) => {
        loadedProducts.length > 0
          ? this.viewContainerRef.createEmbeddedView(this.templateRef)
          : this.viewContainerRef.clear();
      });
    // this.destroyRef.onDestroy(() => {
    //   subscribtion.unsubscribe();
    // });
  }
}
