import {
  DestroyRef,
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { Observable } from 'rxjs';
import { searchBarVisisbleSelector } from '../../../Store/selectors/search.selector';

@Directive({
  selector: '[appSearch]',
  standalone: true,
})
export class SearchBarDirective {
  private store = inject(Store<StoreInterface>);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);

  isVisible$: Observable<boolean> = this.store.select(
    searchBarVisisbleSelector
  );

  constructor() {
    const subscribtion = this.isVisible$.subscribe((visible) => {
      if (visible) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
    this.destroyRef.onDestroy(() => {
      subscribtion.unsubscribe();
    });
  }
}
