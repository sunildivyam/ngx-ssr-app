import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard';
import { IsLoggedInGuard } from '@annuadvent/ngx-tools/fire-auth';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: { title: 'My Dashboard' },
        canActivate: [IsLoggedInGuard],
        canActivateChild: [IsLoggedInGuard],
        runGuardsAndResolvers: 'always',
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
