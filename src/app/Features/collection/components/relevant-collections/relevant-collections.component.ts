import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { CollectionsService } from '../../../../Shared/services/collections.service';
import { map, Observable, take, tap } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
import {
  // spinnerOfUiSelector,
  errorOfUiSelector,
} from '../../../../Store/selectors/ui.selector';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { sortOptionsAction } from '../../../../Store/actions/sort.action';
import { UiService } from '../../../../Shared/services/ui.service';
import { fetchModifiedCollectionAction } from '../../../../Store/actions/collections.action';
import { MetaData } from '../../../../Shared/models/metaData.model';

@Component({
  selector: 'app-relevant-collections',
  standalone: true,
  imports: [
    SectionTitleComponent,
    FormsModule,
    AsyncPipe,
    ProductItemComponent,
    SpinnerComponent,
  ],
  templateUrl: './relevant-collections.component.html',
  styleUrl: './relevant-collections.component.css',
  host: {
    class: 'flex-1',
  },
})
export class RelevantCollectionsComponent {
  private store = inject(Store<StoreInterface>);
  private destroyRef = inject(DestroyRef);
  private collectionService = inject(CollectionsService);
  private uiService = inject(UiService);

  products$: Observable<Product[]> =
    this.collectionService.sortedProductsBySortOptions$;
  isLoading$: Observable<boolean> = this.uiService.isLoading$;
  isError$: Observable<boolean> = this.uiService.isError$;

  metaData: MetaData = {
    currentPage: 1,
    numberOfPages: 1,
  };

  constructor() {
    effect(() => {
      this.metaData = this.collectionService.metaData();
    });
  }

  onPrevPage() {
    this.collectionService.prevPage();
  }
  onNextPage() {
    this.collectionService.nextPage();
  }
  // ------------------------------------------------------------------------

  onSelectSortOptions(sortOptionValue: string) {
    this.store.dispatch(sortOptionsAction({ sortOption: sortOptionValue }));
  }
  // ------------------------------------------------------------------------
}
