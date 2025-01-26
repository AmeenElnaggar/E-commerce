import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../../Shared/services/products.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  private productsService = inject(ProductsService);
  showFilter = signal<boolean>(true);

  onShowFilterOptions() {
    this.showFilter.update((prev) => !prev);
  }

  onSelectedFiltersValues(event: Event) {
    const checkBoxInput = event.target as HTMLInputElement;
    this.productsService.toggleCategory(checkBoxInput.value);
  }
}
