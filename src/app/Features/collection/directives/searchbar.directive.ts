import {
  Directive,
  effect,
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

  isVisible$: Observable<boolean> = this.store.select(
    searchBarVisisbleSelector
  );

  constructor() {
    this.isVisible$.subscribe((visible) => {
      if (visible) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
