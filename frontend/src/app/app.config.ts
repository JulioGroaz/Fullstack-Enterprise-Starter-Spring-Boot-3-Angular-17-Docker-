// English: Global application configuration providers.
// Italiano: Provider di configurazione globale applicazione.
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/jwt.interceptor';

// English: Registers router and HTTP client with JWT interceptor.
// Italiano: Registra router e HTTP client con interceptor JWT.
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
};
