import { Component, inject, signal } from '@angular/core';
import { NavbarService } from '../../../Shared/services/navbar.service';
import { SidenavComponent } from '../../../Shared/components/sidenav/sidenav.component';
import { HeaderComponent } from '../../../Shared/components/header/header.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private navbarService = inject(NavbarService);
  isVisible = this.navbarService.visible;
}
