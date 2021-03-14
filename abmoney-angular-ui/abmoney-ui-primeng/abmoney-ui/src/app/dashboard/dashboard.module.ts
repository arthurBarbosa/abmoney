import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../components/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    PanelModule,
    ChartModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
