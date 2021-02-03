import { BookEntryService, LancamentoFiltro } from './../book-entry.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-book-entry-list',
  templateUrl: './book-entry-list.component.html',
  styleUrls: ['./book-entry-list.component.css'],
})
export class BookEntryListComponent implements OnInit {
  linesPerPage = 0;
  filter = new LancamentoFiltro();
  bookEntry: any[];

  constructor(private bookEntryService: BookEntryService) {}

  ngOnInit(): void {}

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
}
