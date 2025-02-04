import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { authTokenSelector } from '../../Store/selectors/authentication.selector';

export const isAuthGuard: CanMatchFn = (route, segement) => {
  const store = inject(Store);
  const router = inject(Router);

  const currentUrl = router.url;
  if (currentUrl !== '/login') {
    localStorage.setItem('lastPage', currentUrl);
  }

  return store.select(authTokenSelector).pipe(
    map((token) => {
      if (token) {
        return true;
      }
      return new RedirectCommand(router.parseUrl('/login'));
    })
  );
};

export const isNotAuthGuard: CanMatchFn = (route, segement) => {
  const store = inject(Store);

  return store.select(authTokenSelector).pipe(
    map((token) => {
      if (token) {
        return false;
      }
      return true;
    })
  );
};
