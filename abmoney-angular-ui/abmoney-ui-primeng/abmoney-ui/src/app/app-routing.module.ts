import { PersonListComponent } from './components/person/person-list/person-list.component';
import { BookEntryListComponent } from './components/book-entry/book-entry-list/book-entry-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEntryCreateComponent } from './components/book-entry/book-entry-create/book-entry-create.component';

const routes: Routes = [
  { path: 'lancamentos', component: BookEntryListComponent },
  { path: 'lancamentos/novo', component: BookEntryCreateComponent },
  { path: 'pessoas', component: PersonListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
