import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { MessageService, ConfirmationService } from 'primeng/api';
import { NavComponent } from './template/nav/nav.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { PersonService } from './../components/person/person.service';
import { BookEntryService } from './../components/book-entry/book-entry.service';
import { ErrorHandlerService } from './error-handler.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    ConfirmDialogModule,

    RouterModule,
    ToastModule],
  exports: [
    NavComponent,
    ConfirmDialogModule,
    ToastModule],

  providers: [
    MessageService,
    ConfirmationService,

    ErrorHandlerService,
    BookEntryService,
    PersonService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
