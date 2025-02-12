// import {
//   DestroyRef,
//   Directive,
//   inject,
//   TemplateRef,
//   ViewContainerRef,
// } from '@angular/core';
// import { savedCartOfLSSelector } from '../../../Store/selectors/cart.selector';
// import { Store } from '@ngrx/store';
// import { StoreInterface } from '../../../Store/store';
// import { take } from 'rxjs';
// import { Cart } from '../models/cart.model';

// @Directive({
//   selector: '[cartEmpty]',
//   standalone: true,
// })
// export class CartEmptyDirective {
//   private templateRef = inject(TemplateRef);
//   private viewContainerRef = inject(ViewContainerRef);
//   private store = inject(Store<StoreInterface>);
//   private destroyRef = inject(DestroyRef);
//   ngOnInit() {
//     this.cartIsEmpty();
//   }

//   private cartIsEmpty() {
//     const subscribtion = this.store
//       .select(savedCartOfLSSelector)
//       .pipe(take(2))
//       .subscribe((cart: Cart) => {
//         cart.products.length > 0
//           ? this.viewContainerRef.clear()
//           : this.viewContainerRef.createEmbeddedView(this.templateRef);
//       });
//     this.destroyRef.onDestroy(() => {
//       subscribtion.unsubscribe();
//     });
//   }
// }
