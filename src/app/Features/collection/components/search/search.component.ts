import { Component, effect, inject, input, signal } from '@angular/core';
import { CollectionService } from '../../services/collection.service';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../../Shared/services/products.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private collectionService = inject(CollectionService);
  private productsService = inject(ProductsService);
  searchValue = signal<string>('');

  onChangeVisible() {
    this.collectionService.onCloseSearchBarVisible();
  }

  constructor() {
    effect(() => this.productsService.updateSearchValue(this.searchValue()), {
      allowSignalWrites: true,
    });
  }
}
