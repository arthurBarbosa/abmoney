import { AuthGuard } from './../../security/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookEntryCreateComponent } from './book-entry-create/book-entry-create.component';
import { BookEntryListComponent } from './book-entry-list/book-entry-list.component';

const routes: Routes = [
  {
    path: '',
    component: BookEntryListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_OPERATOR'] }
  },
  {
    path: 'novo',
    component: BookEntryCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_OPERATOR'] }
  },
  {
    path: ':id',
    component: BookEntryCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_OPERATOR'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookEntryRoutingModule { }
