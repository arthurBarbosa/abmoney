import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-grid',
  templateUrl: './person-grid.component.html',
  styleUrls: ['./person-grid.component.css'],
})
export class PersonGridComponent implements OnInit {
  @Input() pessoas = [];

  constructor() {}

  ngOnInit(): void {}
}

