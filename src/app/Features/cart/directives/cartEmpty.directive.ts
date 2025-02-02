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

@Directive({
  selector: '[cartEmpty]',
  standalone: true,
})
export class CartEmptyDirective {
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
      .subscribe((loadedProducts) => {
        loadedProducts.length > 0
          ? this.viewContainerRef.clear()
          : this.viewContainerRef.createEmbeddedView(this.templateRef);
      });
    this.destroyRef.onDestroy(() => {
      subscribtion.unsubscribe();
    });
  }
}
