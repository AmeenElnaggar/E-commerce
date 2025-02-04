import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AuthStatusService } from '../../services/authStatus.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  private authStatusService = inject(AuthStatusService);
  private navbarService = inject(NavbarService);

  isVisible: boolean = this.navbarService.visible();
  loginOrLogout$: Observable<string> = this.authStatusService.status$;

  onLogout() {
    this.authStatusService.logoutCheckFn();
    this.changeVisible();
  }

  changeVisible() {
    this.navbarService.setVisibleFn();
  }
}
