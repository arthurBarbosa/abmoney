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
  bookEntry: any[];
  dueDate: Date;
  expirationDateBy: Date;


  constructor(private bookEntryService: BookEntryService) {}

  ngOnInit(): void {
    this.list();
  }

  // search() {
  //   this.bookEntryService.read(this.filtro).subscribe((response) => {
  //     this.bookEntry = response['content'];
  //   });
  // }

  list() {
    const filter: LancamentoFiltro = {
      description: this.description,
      dueDate: this.dueDate,
      expirationDateBy: this.expirationDateBy
    };

    this.bookEntryService
      .getBookEntry(filter)
      .then((bookEntry) => (this.bookEntry = bookEntry));
  }
}
