import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, switchMap, take, tap } from 'rxjs';
import {
  authTokenSelector,
  // selectAuthUserSelector,
} from '../../Store/selectors/authentication.selector';
import { searchBarVisibleAction } from '../../Store/actions/search.action';

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
      .select(authTokenSelector)
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
}
