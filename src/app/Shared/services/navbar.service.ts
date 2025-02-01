import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, switchMap, take, tap } from 'rxjs';
import {
  authStatusSelector,
  selectAuthUserSelector,
} from '../../Store/selectors/authentication.selector';
import { searchBarVisibleAction } from '../../Store/actions/search.action';
import {
  authSuccessAction,
  loginAction,
} from '../../Store/actions/authentication.action';
import { allProductsSelector } from '../../Store/selectors/products.selector';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private store = inject(Store);
  private router = inject(Router);

  visible = signal<boolean>(true);
  loginOrLogoutProp = signal<string>('Login');

  setVisibleFn() {
    this.visible.update((prevSate) => !prevSate);
  }

  profileCheckFn(event: Event) {
    this.store
      .select(selectAuthUserSelector)
      .pipe(take(1))
      .subscribe((userData) => {
        if (userData) {
          event.preventDefault();
          return;
        }
        this.router.navigate(['/login']);
      });
  }

  openSearchBarFn() {
    this.store.dispatch(searchBarVisibleAction());
    this.router.navigate(['/collection']);
  }
<<<<<<< HEAD
=======

  navigateToHome() {
    this.store.select(selectAuthUserSelector).subscribe((res) => {
      if (res) {
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    });
  }

  onReload() {
    let getUserData: any = localStorage.getItem('User');
    const userToken: any = localStorage.getItem('token');
    if (userToken) {
      getUserData = JSON.parse(getUserData);
      this.store.dispatch(loginAction({ userData: getUserData }));
    }
  }
>>>>>>> Authentication
}
