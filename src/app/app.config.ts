import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { reducers } from './Store/store';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),

    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),

    provideStore(reducers),
  ],
};
