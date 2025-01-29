import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AllProductsService } from '../../../../Shared/services/allProducts.service';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import {
  searchBarVisibleAction,
  searchValueAction,
} from '../../../../Store/actions/search.action';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private store = inject(Store<StoreInterface>);

  searchValue: string = '';

  onCloseSearchBar() {
    this.store.dispatch(searchBarVisibleAction());
  }

  onSearchChange(value: string) {
    this.searchValue = value;
    this.store.dispatch(searchValueAction({ searchValue: value }));
  }
}
