import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AuthStatusService } from '../../services/authStatus.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { CartService } from '../../../Features/cart/services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private navbarService = inject(NavbarService);
  private authStatusService = inject(AuthStatusService);
  private cartService = inject(CartService);

  savedProducts$: Observable<any> = this.cartService.comparedCarts$.pipe(
    map((response) => response.products)
  );

  loginOrLogout$: Observable<string> = this.authStatusService.status$;

  changeSideNavVisible() {
    this.navbarService.setVisibleFn();
  }

  onOpenSearchBar() {
    this.navbarService.openSearchBarFn();
  }

  onProfileClick(event: Event) {
    this.navbarService.profileCheckFn(event);
  }

  onLogout() {
    this.authStatusService.logoutCheckFn();
  }
}
