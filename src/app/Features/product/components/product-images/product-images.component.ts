import { Component, inject } from '@angular/core';
import { Product } from '../../../../Shared/models/product.model';
import { ImagesPipe } from '../../pipes/product-images.pipe';

import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [ImagesPipe, AsyncPipe],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.css',
})
export class ProductImagesComponent {
  private productService = inject(ProductService);

  selectedProduct$: Observable<Product> = this.productService.selectedProduct$;
  productCoverImage = this.productService.productCoverImage;

  ngOnInit() {
    this.productService.getProductCoverImage();
  }

  getClickedImagePath(imagePath: string) {
    this.productCoverImage.set(imagePath);
  }
}
