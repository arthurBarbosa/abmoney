import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-entry-create',
  templateUrl: './book-entry-create.component.html',
  styleUrls: ['./book-entry-create.component.css'],
})
export class BookEntryCreateComponent implements OnInit {
  types = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [
    {label: 'Alimentação', value: 1},
    {label: 'Transporte', value: 2}
  ];

  pessoas = [
    {label: 'João Rosa Junior', value: 1},
    {label: 'Estevam Rodrigues', value: 2},
    {label: 'André Machado', value: 3},
    {label: 'Célio Matos', value: 4}
  ];

  constructor() {}

  ngOnInit(): void {}
}
