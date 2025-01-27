import { effect, inject, Injectable, input, signal } from '@angular/core';
import { ProductsService } from './../../../Shared/services/products.service';
import { Product } from '../../../Shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private ProductsService = inject(ProductsService);
  private productId = signal<string>('');

  selectedProductData = signal<Product | undefined>(undefined);
  selectedProductCoverImage = signal<string | undefined>('');

  constructor() {
    effect(
      () => {
        const selectedProduct = this.ProductsService.getOriginalProducts().find(
          (product) => product.id === this.productId()
        );
        this.selectedProductData.set(selectedProduct);
        this.selectedProductCoverImage.set(selectedProduct?.imageCover);
      },
      { allowSignalWrites: true }
    );
  }

  getProductIdFromActiveLink(id: string) {
    this.productId.set(id);
  }
}
