import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './admin/admin.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent),
        title: 'Login'
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register.component').then(c => c.RegisterComponent),
        title: 'Register'
    },
    {
        path: '',
        children: ADMIN_ROUTES,
    },
    {
        path: 'access-denied',
        loadComponent: () => import('./access-denied/access-denied.component').then(c => c.AccessDeniedComponent),
    },
];
