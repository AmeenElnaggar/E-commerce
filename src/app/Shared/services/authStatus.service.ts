import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../Store/store';
import {
  statusSelector,
  loginErrorSelector,
} from '../../Store/selectors/authentication.selector';
import { loginStatusAction } from '../../Store/actions/authentication.action';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStatusService {
  private store = inject(Store<StoreInterface>);
  private router = inject(Router);

  status$: Observable<string> = this.store.select(statusSelector);
  error$: Observable<any> = this.store.select(loginErrorSelector);

  logoutCheckFn() {
    localStorage.removeItem('token');
    localStorage.removeItem('UserLogin');
    this.store.dispatch(loginStatusAction({ token: '', error: false }));
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
