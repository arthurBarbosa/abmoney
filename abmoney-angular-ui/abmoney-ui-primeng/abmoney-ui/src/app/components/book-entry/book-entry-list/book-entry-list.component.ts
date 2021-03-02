import { BookEntryService, LancamentoFiltro } from './../book-entry.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

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

  constructor(private bookEntryService: BookEntryService) { }

  ngOnInit(): void { this.list(); }

  list(page = 0): void {
    this.filter.page = page;
    this.bookEntryService.getBookEntry(this.filter).then((result) => {
      this.linesPerPage = result.total;
      this.bookEntry = result.bookEntry;
      console.log(result);
    });
  }

  changePage(event: LazyLoadEvent): void {
    const page = event.first / event.rows;
    this.list(page);
  }

  delete(bookEntry: any): void {
    this.bookEntryService.delete(bookEntry.id)
      .then(() => {
        this.grid.reset();
      });
  }
}
