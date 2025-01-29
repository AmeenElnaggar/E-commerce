import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { searchBarVisibleAction } from '../../../Store/actions/search.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private navbarService = inject(NavbarService);
  private store = inject(Store<StoreInterface>);
  private router = inject(Router);

  changeSideNavVisible() {
    this.navbarService.setVisible();
  }

  onOpenSearchBar() {
    this.store.dispatch(searchBarVisibleAction());
    this.router.navigate(['/collection']);
  }
}
