import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const autorizadoGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('jwt');
  const router = inject(Router);
  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
