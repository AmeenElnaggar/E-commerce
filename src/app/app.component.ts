import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/components/navbar/navbar.component';
import { FooterComponent } from './Core/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from './Store/store';
import {
  fetchModifiedCollectionAction,
  fetchOriginalCollectionAction,
} from './Store/actions/collections.action';
// import { SpinnerComponent } from './Shared/components/spinner/spinner.component';
import { NavbarService } from './Shared/services/navbar.service';
import { CartService } from './Features/cart/services/cart.service';
import { CollectionsService } from './Shared/services/collections.service';
import { ValidationService } from './Features/authentication/services/validation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private store = inject(Store<StoreInterface>);
  private navbarService = inject(NavbarService);
  private collectionService = inject(CollectionsService);
  private cartService = inject(CartService);
  private validationService = inject(ValidationService);

  ngOnInit() {
    this.store.dispatch(fetchOriginalCollectionAction());
    this.validationService.isAuthenticated();

    this.cartService.fetchCartFromLS();
    this.cartService.fetchUserCart();
  }
}
