import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { BookEntryListComponent } from './components/book-entry/book-entry-list/book-entry-list.component';
import { NavComponent } from './components/template/nav/nav.component';
import { PersonComponent } from './components/person/person.component';

@NgModule({
  declarations: [AppComponent,  BookEntryListComponent, NavComponent, PersonComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
