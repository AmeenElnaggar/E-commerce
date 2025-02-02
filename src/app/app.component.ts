import { Component, inject, OnInit, signal } from '@angular/core';
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
  private cartService = inject(CartService);

  pageIsLoading = signal<boolean>(true);

  ngOnInit() {
    this.store.dispatch(getCollectionAction());
    this.navbarService.onReload();
    this.loadPage();
    const token = localStorage.getItem('token');
    // if (token) {
    //   this.store.dispatch(authSuccessAction({ token, user: '' }));
    // }
  }

  loadPage() {
    const checkLogin = setInterval(() => {
      this.store.select(selectAuthUserSelector).subscribe((result) => {
        this.pageIsLoading.set(false);
        clearInterval(checkLogin);
      });
    }, 1000);
  }
}
