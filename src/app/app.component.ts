import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/components/navbar/navbar.component';
import { ProductsService } from './Shared/services/products.service';
import { FooterComponent } from './Core/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private productsService = inject(ProductsService);
  ngOnInit(): void {
    this.productsService.fetchProducts();
  }
}
