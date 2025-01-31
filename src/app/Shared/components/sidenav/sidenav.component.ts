import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  private navbarService = inject(NavbarService);

  isVisible: boolean = this.navbarService.visible();

  changeVisible() {
    this.navbarService.setVisibleFn();
  }
}
