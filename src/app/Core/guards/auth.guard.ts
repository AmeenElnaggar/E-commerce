import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAuthTokenSelector } from '../../Store/selectors/authentication.selector';

export const isAuthGuard: CanMatchFn = (route, segement) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAuthTokenSelector).pipe(
    map((token) => {
      if (token) {
        return true;
      }
      return new RedirectCommand(router.parseUrl('/login'));
    })
  );
};
