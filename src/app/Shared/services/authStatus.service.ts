import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../Store/store';
import {
  authStatusSelector,
  selectAuthErrorSelector,
} from '../../Store/selectors/authentication.selector';
import { authSuccessAction } from '../../Store/actions/authentication.action';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthStatusService {
  private store = inject(Store<StoreInterface>);
  private router = inject(Router);

  status = signal<string>('Login');
  error = signal<string>('');

  ChangeStatus() {
    this.store.select(authStatusSelector).subscribe((result) => {
      this.status.set(result);
    });
  }

  handleError() {
    this.store
      .select(selectAuthErrorSelector)
      .subscribe((res) => this.error.set(res));
  }

  logoutCheckFn() {
    if (this.status() === 'Logout') {
      this.store.dispatch(authSuccessAction({ token: '', user: null }));
      localStorage.setItem('token', '');
      localStorage.setItem('User', '');
    }
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
