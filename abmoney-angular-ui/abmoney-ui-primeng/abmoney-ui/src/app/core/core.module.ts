import { CategoryService } from './../components/category/category.service';
import { PageNotFoundComponent } from './../components/not-found/page-not-found/page-not-found.component';
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
import { AuthService } from './../security/auth.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [NavComponent, PageNotFoundComponent],
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
    CategoryService,
    ConfirmationService,

    ErrorHandlerService,
    BookEntryService,
    PersonService,
    AuthService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
