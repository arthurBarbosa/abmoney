import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookEntryCreateComponent } from './book-entry-create/book-entry-create.component';
import { BookEntryListComponent } from './book-entry-list/book-entry-list.component';

const routes: Routes = [
  { path: 'lancamentos', component: BookEntryListComponent },
  { path: 'lancamentos/novo', component: BookEntryCreateComponent },
  { path: 'lancamentos/:id', component: BookEntryCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookEntryRoutingModule { }
