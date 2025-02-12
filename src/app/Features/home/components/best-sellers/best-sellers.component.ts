import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';

import { AsyncPipe } from '@angular/common';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';

import { Observable } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
// import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';

import { CollectionsService } from '../../../../Shared/services/collections.service';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [
    SectionTitleComponent,
    AsyncPipe,
    ProductItemComponent,
    // SpinnerComponent,
  ],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css',
})
export class BestSellersComponent {
  private collectionService = inject(CollectionsService);

  bestProducts$: Observable<Product[]> = this.collectionService.bestProducts$;
}
