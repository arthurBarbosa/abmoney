import { BookEntryModule } from './components/book-entry/book-entry.module';
import { AuthGuard } from './security/auth.guard';
import { LoginFormComponent } from './security/login-form/login-form.component';
import { BookEntryCreateComponent } from './components/book-entry/book-entry-create/book-entry-create.component';
import { BookEntryListComponent } from './components/book-entry/book-entry-list/book-entry-list.component';
import { PageNotFoundComponent } from './components/not-found/page-not-found/page-not-found.component';
import { PersonCreateComponent } from './components/person/person-create/person-create.component';
import { PersonListComponent } from './components/person/person-list/person-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/lancamentos', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },

  {
    path: 'lancamentos',
    loadChildren: () => import('../app/components/book-entry/book-entry.module').then(m => m.BookEntryModule)
  },

  {
    path: 'pessoas',
    loadChildren: () => import('../app/components/person/person.module').then(p => p.PersonModule)
  },

  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
