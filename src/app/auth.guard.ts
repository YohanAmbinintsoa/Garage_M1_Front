import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const router = inject(Router);
  const url = state.url;
  const userRole = authService.getUserRole();

  if (!authService.isConnected()) {
    router.navigate(['/login']);
    return false;
  }

  const redirectToUnauthorized = (url : string) => {
    router.navigate(['/unauthorized'], { queryParams: { returnUrl: url } });
    return false;
  };

  if (url.startsWith('/admin') && userRole !== 'admin') {
    return redirectToUnauthorized("/home");
  }

  if (url.startsWith('/mecano') && userRole !== 'mecano') {
    return redirectToUnauthorized("/home");
  }

  if (!url.startsWith('/admin') && !url.startsWith('/mecano') && userRole !== 'user') {
    return redirectToUnauthorized("/home");
  }
  return true;
};
