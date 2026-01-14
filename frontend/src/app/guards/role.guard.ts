// English: Guard that enforces role-based access.
// Italiano: Guardia che impone accesso basato su ruoli.
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// English: Allows activation only if user has a required role.
// Italiano: Permette attivazione solo se l'utente ha il ruolo richiesto.
export const roleGuard: CanActivateFn = route => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roles = route.data?.['roles'] as string[] | undefined;

  if (!roles || roles.length === 0) {
    return true;
  }

  if (roles.some(role => auth.hasRole(role))) {
    return true;
  }

  return router.parseUrl('/profile');
};
