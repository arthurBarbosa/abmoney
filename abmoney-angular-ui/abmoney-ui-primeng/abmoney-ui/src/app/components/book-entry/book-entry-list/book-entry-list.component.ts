import { BookEntryService } from './../book-entry.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-entry-list',
  templateUrl: './book-entry-list.component.html',
  styleUrls: ['./book-entry-list.component.css'],
})
export class BookEntryListComponent implements OnInit {
  bookEntry = [];

  totalElements = 0;
  page = 0;
  size = 6;

  constructor(private bookEntryService: BookEntryService) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.bookEntryService.read()
    .subscribe(response => {
      this.bookEntry = response['content'];

    })
  }
}
