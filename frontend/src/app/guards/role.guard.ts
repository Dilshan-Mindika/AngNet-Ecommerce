import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'];

  const user = authService.getUser();

  if (authService.isLoggedIn() && user && user.role === expectedRole) {
    return true;
  } else {
    // Redirect to home or unauthorized page
    router.navigate(['/']);
    return false;
  }
};
