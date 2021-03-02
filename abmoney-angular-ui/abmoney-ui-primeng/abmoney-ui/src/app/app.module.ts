import { PersonService } from './components/person/person.service';
import { BookEntryService } from './components/book-entry/book-entry.service';
import { CoreModule } from './core/core.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BookEntryModule } from './components/book-entry/book-entry.module';
import { PersonModule } from './components/person/person.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BookEntryModule,
    PersonModule,

    CurrencyMaskModule,
    ToastModule,
    CoreModule,
    ConfirmDialogModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    MessageService,
    ConfirmationService,
    BookEntryService,
    PersonService],
  bootstrap: [AppComponent],
})
export class AppModule { }
