import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookEntryRoutingModule } from './book-entry-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { BookEntryGridComponent } from './book-entry-grid/book-entry-grid.component';
import { BookEntryListComponent } from './book-entry-list/book-entry-list.component';
import { BookEntryCreateComponent } from './book-entry-create/book-entry-create.component';

import { LancamentosRoutingModule } from './lancamentos-routing.module';



@NgModule({
  declarations: [
    BookEntryCreateComponent,
    BookEntryListComponent,
    BookEntryGridComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    BookEntryRoutingModule,
    LancamentosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [BookEntryCreateComponent, BookEntryListComponent],
})
export class BookEntryModule { }
