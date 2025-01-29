import { Component, effect, inject, input, signal } from '@angular/core';
import { Product } from '../../../../Shared/models/product.model';
import { ImagesPipe } from '../../pipes/product-images.pipe';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { Observable } from 'rxjs';
import { selectedProductDataSelector } from '../../../../Store/selectors/product.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [ImagesPipe, AsyncPipe],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.css',
})
export class ProductImagesComponent {
  private store = inject(Store<StoreInterface>);
  selectedProduct$: Observable<Product> = this.store.select(
    selectedProductDataSelector
  );

  productCoverImage = signal<string>('');

  getClickedImagePath(imagePath: string) {
    this.productCoverImage.set(imagePath);
  }

  ngOnInit() {
    this.selectedProduct$.subscribe((product) => {
      this.productCoverImage.set(product.imageCover);
    });
  }
}
