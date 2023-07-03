import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './constants/dashboard-routes.constants';


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
