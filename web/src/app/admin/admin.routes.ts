import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent),
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'users-liting',
                loadComponent: () => import('./users-listing/users-listing.component').then(c => c.UsersListingComponent)
            }
        ]
        
    },
];
