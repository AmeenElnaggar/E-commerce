import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CollectionService } from '../services/collection.service';

@Directive({
  selector: '[appSearch]',
  standalone: true,
})
export class SearchDirective {
  private collectionService = inject(CollectionService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.collectionService.isVisible() === true) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
