import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/components/navbar/navbar.component';
import { FooterComponent } from './Core/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from './Store/store';
import { getCollectionAction } from './Store/actions/products.action';
import { ValidationService } from './Features/authentication/services/validation.service';
import {
  authStatusSelector,
  selectAuthUserSelector,
} from './Store/selectors/authentication.selector';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from './Shared/spinner/spinner.component';
import { NavbarService } from './Shared/services/navbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AsyncPipe,
    SpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private store = inject(Store<StoreInterface>);
  private navbarService = inject(NavbarService);

  pageIsLoading = signal<boolean>(true);

  ngOnInit() {
    this.store.dispatch(getCollectionAction());
    this.navbarService.onReload();
    this.loadPage();
  }

  loadPage() {
    const checkLogin = setInterval(() => {
      this.store.select(selectAuthUserSelector).subscribe((result) => {
        this.pageIsLoading.set(false);
        clearInterval(checkLogin);
      });
    }, 1000);
  }
}
