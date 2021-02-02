import { BookEntryService, LancamentoFiltro } from './../book-entry.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-entry-list',
  templateUrl: './book-entry-list.component.html',
  styleUrls: ['./book-entry-list.component.css'],
})
export class BookEntryListComponent implements OnInit {
  description: string;
  bookEntry:[] = [];
  filtro = new LancamentoFiltro();
  totalElements = 0;
  page = 0;
  size = 6;

  constructor(private bookEntryService: BookEntryService) {}

  ngOnInit(): void {
    this.search(this.page);
    console.log('aaaaaaaquiiiiiiiiiiiiiiiii' + this.bookEntry);
  }

  search(page = 0) {
    this.filtro.page = page;
    this.bookEntryService.read(this.filtro).then((response) => {
      this.totalElements = response.total;
      this.bookEntry = response.bookEntry;
      this.page = response.number;
      console.log(this.bookEntry);
    });
  }
}
