import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../../Shared/services/products.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  private productService = inject(ProductsService);
}
