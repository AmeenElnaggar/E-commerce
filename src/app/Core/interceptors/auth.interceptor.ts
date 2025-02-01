import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor = function (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const getToken = localStorage.getItem('token');

  if (getToken) {
    request = request.clone({
      setHeaders: { token: `${getToken}` },
    });
  }
  return next(request);
};
