import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IRole } from '../../admin/role/role.model';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('user')!); 
  if (!user.roles) {
    router.navigate(['/access-denied'])
    return false;
  }
  const isAdmin = user.roles.map((role: IRole) => role.name.includes('admin'));
  
  if (isAdmin) {
    return true;
  }

  router.navigate(['/access-denied'])
  return false;
};
