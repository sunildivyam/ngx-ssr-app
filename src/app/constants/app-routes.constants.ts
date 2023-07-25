import { Route, Routes } from '@angular/router';
import { LoginComponent } from '../modules/app-core';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Sign In' },
    },
    {
        path: 'dashboard',
        loadChildren: () => import('../modules/dashboard').then(m => m.DashboardModule),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
