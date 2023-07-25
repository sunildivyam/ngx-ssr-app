import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { MetaModule } from '@annuadvent/ngx-common-ui/meta';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule,
    MetaModule,
  ],
  exports: [
    DashboardComponent,
  ],
  providers: [],
})
export class DashboardModule { }
