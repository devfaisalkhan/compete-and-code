import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const isUserAvai = localStorage.getItem('user'); 
  
  if (!isUserAvai) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
