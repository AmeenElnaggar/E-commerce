import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './Core/interceptors/auth.interceptor';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducers } from './Store/store';
import { CollectionEffect } from './Store/effects/collection.effect';
import { CartEffect } from './Store/effects/cart.effect';
import { AuthenticationEffect } from './Store/effects/authentication.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([loggingInterceptor])),

    provideStore(reducers),
    provideEffects([
      CollectionEffect,
      AuthenticationEffect,
      CartEffect,
      CartEffect,
    ]),
  ],
};
