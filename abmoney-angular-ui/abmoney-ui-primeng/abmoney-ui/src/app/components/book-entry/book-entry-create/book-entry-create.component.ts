import { ErrorHandlerService } from './../../../core/error-handler.service';
import { CategoryService } from './../../category/category.service';
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

  ];

  pessoas = [
    { label: 'João Rosa Junior', value: 1 },
    { label: 'Estevam Rodrigues', value: 2 },
    { label: 'André Machado', value: 3 },
    { label: 'Célio Matos', value: 4 }
  ];

  constructor(
    private categoryService: CategoryService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    return this.categoryService.getAllCategories()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.name, value: c.id }));
      });
  }
}
