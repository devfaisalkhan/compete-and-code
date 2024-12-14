import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'admin',
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./admin/dashboard/dashboard.component').then(c => c.DashboardComponent)
            }
        ]
        
    },
];
