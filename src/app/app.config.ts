import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import MyPreset from './MyPreset';
import { MessageService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes), provideHttpClient(), MessageService, provideAnimationsAsync(),
  providePrimeNG({
    theme: {
      preset: MyPreset,
      options: {
        darkModeSelector: false || 'none'
      }
    }
  })]
};
