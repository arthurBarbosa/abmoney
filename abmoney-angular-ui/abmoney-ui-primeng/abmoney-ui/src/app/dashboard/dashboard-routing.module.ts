import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../security/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_OPERATOR', 'ROLE_ADMIN'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
