// English: Guard that enforces authentication.
// Italiano: Guardia che impone autenticazione.
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// English: Allows route activation only if user is logged in.
// Italiano: Permette l'attivazione solo se l'utente e loggato.
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    return true;
  }
  return router.parseUrl('/login');
};
