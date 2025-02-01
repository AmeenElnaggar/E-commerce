import { Component, effect, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AuthStatusService } from '../../services/authStatus.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  private authStatusService = inject(AuthStatusService);
  private navbarService = inject(NavbarService);
  private activ = inject(ActivatedRoute);

  isVisible: boolean = this.navbarService.visible();
  loginOrLogout: string = '';

  constructor() {
    effect(() => {
      this.loginOrLogout = this.authStatusService.status();
    });
  }

  ngOnInit() {
    this.authStatusService.ChangeStatus();
  }

  onLoginOrLogout() {
    this.authStatusService.logoutCheckFn();
    this.changeVisible();
  }

  changeVisible() {
    this.navbarService.setVisibleFn();
  }
}
