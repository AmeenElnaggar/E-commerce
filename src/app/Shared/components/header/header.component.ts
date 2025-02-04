import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AuthStatusService } from '../../services/authStatus.service';
<<<<<<< HEAD
=======
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
>>>>>>> a14c0eb (Edit Some Logic Of Authentication)

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private navbarService = inject(NavbarService);
  private authStatusService = inject(AuthStatusService);

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

  get cartProductsLength() {
    let cartLength = localStorage.getItem('Products');
    if (cartLength) {
      cartLength = JSON.parse(cartLength);
      return cartLength?.length;
    } else {
      return 0;
    }
  }
}
