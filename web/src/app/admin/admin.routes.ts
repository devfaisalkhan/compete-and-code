import { Routes } from '@angular/router';
import { authGuard } from '../pages/auth/auth.guard';
import { roleGuard } from '../pages/auth/role.guard';

export const ADMIN_ROUTES: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent),
        canActivate: [authGuard, roleGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
                title: 'Dashboard'
            },
            {
                path: 'users-liting',
                loadComponent: () => import('./users-listing/users-listing.component').then(c => c.UsersListingComponent),
                title: 'Users liting'
            }
        ]
        
    },
];
