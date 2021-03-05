import { AuthGuard } from './../../security/auth.guard';
import { PersonCreateComponent } from './person-create/person-create.component';
import { PersonListComponent } from './person-list/person-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [

  {
    path: '',
    component: PersonListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_OPERATOR'] }
  },
  {
    path: 'novo',
    component: PersonCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_OPERATOR'] }
  },

  {
    path: ':id',
    component: PersonCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_OPERATOR'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
