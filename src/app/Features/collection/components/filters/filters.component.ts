import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { selectedCategoriesAction } from '../../../../Store/actions/categories.action';
import { selectedCategoriesSelector } from '../../../../Store/selectors/categories.selector';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CollectionsService } from '../../../../Shared/services/collections.service';
import { Category } from '../../models/category.model';
import { AsyncPipe } from '@angular/common';
import { fetchModifiedCollectionAction } from '../../../../Store/actions/collections.action';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  private store = inject(Store<StoreInterface>);
  private collectionService = inject(CollectionsService);
  private httpClient = inject(HttpClient);
  categories$: Observable<Category[]> = this.collectionService.categories$;

  showFilter = signal<boolean>(false);

  onShowFilterOptions() {
    this.showFilter.update((prev) => !prev);
  }

  toggleCategory(event: Event) {
    const checkBoxInput = event.target as HTMLInputElement;
    this.store.dispatch(
      selectedCategoriesAction({
        categoryId: checkBoxInput.value,
      })
    );
    this.store.dispatch(fetchModifiedCollectionAction({}));
  }
}
