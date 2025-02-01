import { Component, inject } from '@angular/core';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';

import { AsyncPipe } from '@angular/common';
import { ProductItemComponent } from '../../../../Shared/components/product-item/product-item.component';

import { Observable } from 'rxjs';
import { Product } from '../../../../Shared/models/product.model';
import { SpinnerComponent } from '../../../../Shared/spinner/spinner.component';

import { AllProductsService } from '../../../../Shared/services/allProducts.service';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [
    SectionTitleComponent,
    AsyncPipe,
    ProductItemComponent,
    SpinnerComponent,
  ],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css',
})
export class BestSellersComponent {
  private allProductsService = inject(AllProductsService);

  isLoading = this.allProductsService.isLoading;
  error = this.allProductsService.error;

  bestProducts$: Observable<Product[]> = this.allProductsService.bestProducts$;

  ngOnInit() {
    this.allProductsService.isLoadingAndErrorStatus();
  }
}
