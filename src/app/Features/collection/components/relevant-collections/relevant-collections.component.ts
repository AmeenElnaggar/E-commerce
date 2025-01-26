import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../../Shared/services/products.service';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';

@Component({
  selector: 'app-relevant-collections',
  standalone: true,
  imports: [
    SectionTitleComponent,
    ProductItemComponent,
    FormsModule,
    SpinnerComponent,
  ],
  templateUrl: './relevant-collections.component.html',
  styleUrl: './relevant-collections.component.css',
  host: {
    class: 'flex-1',
  },
})
export class RelevantCollectionsComponent {
  private productsService = inject(ProductsService);

  products = this.productsService.allProducts;
  isFetching = this.productsService.isFetching;
  error = this.productsService.errorMessage;

  onSelectionChange(value: string) {
    this.productsService.onSelectedSortedValueChanges(value);
  }
}
