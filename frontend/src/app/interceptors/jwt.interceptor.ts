// English: HTTP interceptor that attaches JWT tokens and handles 401.
// Italiano: Interceptor HTTP che allega JWT e gestisce 401.
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { API_BASE_URL } from '../api-base';

// English: Adds Authorization header for API calls and logs out on 401.
// Italiano: Aggiunge header Authorization per chiamate API e fa logout su 401.
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();
  let authReq = req;

  if (token && req.url.startsWith(API_BASE_URL)) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        auth.logout();
        router.navigateByUrl('/login');
      }
      return throwError(() => err);
    })
  );
};
