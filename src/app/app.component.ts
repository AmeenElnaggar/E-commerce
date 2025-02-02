import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/components/navbar/navbar.component';
import { FooterComponent } from './Core/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from './Store/store';
import { getCollectionAction } from './Store/actions/products.action';
import { selectAuthUserSelector } from './Store/selectors/authentication.selector';
import { SpinnerComponent } from './Shared/spinner/spinner.component';
import { NavbarService } from './Shared/services/navbar.service';
import { CartService } from './Features/cart/services/cart.service';
import { authSuccessAction } from './Store/actions/authentication.action';
import { AllProductsService } from './Shared/services/allProducts.service';

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

  pageIsLoading: boolean = true;

  constructor() {
    effect(() => {
      this.pageIsLoading = this.allProductsService.appIsLoading();
    });
  }

  ngOnInit() {
    this.store.dispatch(getCollectionAction());
    this.navbarService.onReload();
    this.allProductsService.loadPage();
    this.allProductsService.isAuthenticated();
  }
}
