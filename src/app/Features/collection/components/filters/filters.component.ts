import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { selectedCategoriesAction } from '../../../../Store/actions/categories.action';
import { selectedCategoriesSelector } from '../../../../Store/selectors/categories.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  private store = inject(Store<StoreInterface>);

  showFilter = signal<boolean>(true);

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
  }
}
