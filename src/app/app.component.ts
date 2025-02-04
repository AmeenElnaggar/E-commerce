import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/components/navbar/navbar.component';
import { FooterComponent } from './Core/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from './Store/store';
import { getCollectionAction } from './Store/actions/products.action';
import { SpinnerComponent } from './Shared/spinner/spinner.component';
import { NavbarService } from './Shared/services/navbar.service';
import { CartService } from './Features/cart/services/cart.service';
import { AllProductsService } from './Shared/services/allProducts.service';
import { ValidationService } from './Features/authentication/services/validation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private store = inject(Store<StoreInterface>);
  private navbarService = inject(NavbarService);
  private allProductsService = inject(AllProductsService);
  private cartService = inject(CartService);
  private validationService = inject(ValidationService);

  ngOnInit() {
    this.store.dispatch(getCollectionAction());
    this.allProductsService.isAuthenticated();
  }
}
