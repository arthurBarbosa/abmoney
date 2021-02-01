import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CurrencyMaskModule } from 'ng2-currency-mask';


import { NavComponent } from './components/template/nav/nav.component';



import { MessageComponent } from './components/shared/message/message.component';


import { BookEntryModule } from './components/book-entry/book-entry.module';
import { PersonModule } from './components/person/person.module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    BookEntryModule,
    PersonModule,

    CurrencyMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
