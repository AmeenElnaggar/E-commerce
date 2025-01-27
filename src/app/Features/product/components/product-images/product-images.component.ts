import { Component, effect, input, signal } from '@angular/core';
import { Product } from '../../../../Shared/models/product.model';
import { ImagesPipe } from '../../pipes/product-images.pipe';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [ImagesPipe],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.css',
})
export class ProductImagesComponent {
  selectedProduct = input.required<Product | undefined>();

  productCoverImage?: string;

  constructor() {
    effect(() => {
      this.productCoverImage = this.selectedProduct()?.imageCover;
    });
  }

  getClickedImagePath(imagePath: string) {
    this.productCoverImage = imagePath;
  }
}
