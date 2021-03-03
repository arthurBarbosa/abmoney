import { PersonCreateComponent } from './person-create/person-create.component';
import { PersonListComponent } from './person-list/person-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  { path: 'pessoas', component: PersonListComponent },
  { path: 'pessoas/nova', component: PersonCreateComponent },
  { path: 'pessoas/:codigo', component: PersonCreateComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
