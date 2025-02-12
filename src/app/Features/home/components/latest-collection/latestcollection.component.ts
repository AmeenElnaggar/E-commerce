import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';
import { Observable } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
import { AsyncPipe } from '@angular/common';
// import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';

import { CollectionsService } from '../../../../Shared/services/collections.service';

@Component({
  selector: 'app-latest-collection',
  standalone: true,
  imports: [
    SectionTitleComponent,
    ProductItemComponent,
    AsyncPipe,
    // SpinnerComponent,
  ],
  templateUrl: './latestcollection.component.html',
  styleUrl: './latestcollection.component.css',
})
export class LatestcollectionComponent {
  private collectionService = inject(CollectionsService);

  latestProducts$: Observable<Product[]> =
    this.collectionService.latestProducts$;
}
