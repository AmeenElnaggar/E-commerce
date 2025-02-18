// import {
//   DestroyRef,
//   Directive,
//   inject,
//   TemplateRef,
//   ViewContainerRef,
// } from '@angular/core';
// import { savedProductsOfLoggedUserSelector } from '../../../Store/selectors/cart.selector';
// import { Store } from '@ngrx/store';
// import { StoreInterface } from '../../../Store/store';
// import { take } from 'rxjs';

// @Directive({
//   selector: '[ordersNotEmpty]',
//   standalone: true,
// })
// export class OrdersNotEmptyDirective {
//   private templateRef = inject(TemplateRef);
//   private viewContainerRef = inject(ViewContainerRef);
//   private store = inject(Store<StoreInterface>);
//   private destroyRef = inject(DestroyRef);

//   ngOnInit() {
//     this.ordersNotEmpty();
//   }

//   private ordersNotEmpty() {
//     const subscribtion = this.store
//       .select(savedProductsOfLoggedUserSelector)
//       .pipe(take(1))
//       .subscribe((loadedProducts) => {
//         loadedProducts.length > 0
//           ? this.viewContainerRef.clear()
//           : this.viewContainerRef.createEmbeddedView(this.templateRef);
//       });
//     this.destroyRef.onDestroy(() => {
//       subscribtion.unsubscribe();
//     });
//   }
// }
