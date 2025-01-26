import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { CollectionService } from '../../../Features/collection/services/collection.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private navbarService = inject(NavbarService);
  private collectionService = inject(CollectionService);
  private router = inject(Router);

  changeSideNavVisible() {
    this.navbarService.setVisible();
  }

  changeSearchBarVisible() {
    this.collectionService.onOpenSearchBarVisible();
    this.router.navigate(['/collection']);
  }
}
