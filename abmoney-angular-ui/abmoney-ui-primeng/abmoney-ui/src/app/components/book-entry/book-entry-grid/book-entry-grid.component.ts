import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-entry-grid',
  templateUrl: './book-entry-grid.component.html',
  styleUrls: ['./book-entry-grid.component.css']
})
export class BookEntryGridComponent implements OnInit {

  @Input() lancamentos = [];

  constructor() { }

  ngOnInit(): void {
  }

}
