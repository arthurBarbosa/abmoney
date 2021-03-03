import { ErrorHandlerService } from './../../../core/error-handler.service';
import { BookEntryService, LancamentoFiltro } from './../book-entry.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-book-entry-list',
  templateUrl: './book-entry-list.component.html',
  styleUrls: ['./book-entry-list.component.css'],
})
export class BookEntryListComponent implements OnInit {
  linesPerPage = 0;
  filter = new LancamentoFiltro();
  bookEntry: any[];
  @ViewChild('table') grid: Table;

  constructor(
    private bookEntryService: BookEntryService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos');
    this.list();
  }

  list(page = 0): void {
    this.filter.page = page;
    this.bookEntryService.getBookEntry(this.filter).then((result) => {
      this.linesPerPage = result.total;
      this.bookEntry = result.bookEntry;
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  changePage(event: LazyLoadEvent): void {
    const page = event.first / event.rows;
    this.list(page);
  }

  confirm(bookEntry: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.delete(bookEntry);
      }
    });
  }

  delete(bookEntry: any): void {
    this.bookEntryService.delete(bookEntry.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.list();
        } else {
          this.grid.reset();
        }
        this.messageService
          .add({ severity: 'success', detail: 'Lançamento excluído com sucesso.' });

      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
