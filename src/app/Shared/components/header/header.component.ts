import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AuthStatusService } from '../../services/authStatus.service';

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

  loginOrLogout: string = '';

  constructor() {
    effect(() => {
      this.loginOrLogout = this.authStatusService.status();
    });
  }

  ngOnInit() {
    // this.navbarService.onReload();
    this.authStatusService.ChangeStatus();
  }

  changeSideNavVisible() {
    this.navbarService.setVisibleFn();
  }

  onOpenSearchBar() {
    this.navbarService.openSearchBarFn();
  }

  onProfileClick(event: Event) {
    this.navbarService.profileCheckFn(event);
  }

  onLoginOrLogout() {
    this.authStatusService.logoutCheckFn();
  }
}
