import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('user')!); 
  
  if (user.roles.name == 'admin') {
    return true;
  }
  router.navigate(['/access-denied'])
  return false;
};
