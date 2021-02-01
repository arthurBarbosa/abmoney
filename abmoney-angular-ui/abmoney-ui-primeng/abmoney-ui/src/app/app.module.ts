import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { BookEntryListComponent } from './components/book-entry/book-entry-list/book-entry-list.component';
import { NavComponent } from './components/template/nav/nav.component';
import { PersonComponent } from './components/person/person.component';
import { BookEntryCreateComponent } from './components/book-entry/book-entry-create/book-entry-create.component';
import { PersonCreateComponent } from './components/person/person-create/person-create.component';
import { MessageComponent } from './components/shared/message/message.component';
import { BookEntryGridComponent } from './components/book-entry/book-entry-grid/book-entry-grid.component';
import { PersonGridComponent } from './components/person/person-grid/person-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    BookEntryListComponent,
    NavComponent,
    PersonComponent,
    BookEntryCreateComponent,
    PersonCreateComponent,
    MessageComponent,
    BookEntryGridComponent,
    PersonGridComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    CurrencyMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
