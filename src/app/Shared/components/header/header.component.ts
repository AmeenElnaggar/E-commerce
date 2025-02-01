import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AuthStatusService } from '../../services/authStatus.service';
import { Store } from '@ngrx/store';
import { authStatusSelector } from '../../../Store/selectors/authentication.selector';
import { StoreInterface } from '../../../Store/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private navbarService = inject(NavbarService);
  private authStatusService = inject(AuthStatusService);
  private store = inject(Store<StoreInterface>);

  loginOrLogout: string = '';

  constructor() {
    effect(() => {
      this.loginOrLogout = this.authStatusService.status();
    });
  }

  ngOnInit() {
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
