import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BookEntryService } from './../book-entry.service';
import { PersonService } from './../../person/person.service';
import { BookEntry } from './../../../model/book-entry';
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

  categories = [];
  persons = [];
  bookEntry = new BookEntry();

  constructor(
    private categoryService: CategoryService,
    private errorHandler: ErrorHandlerService,
    private personService: PersonService,
    private bookEntryService: BookEntryService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.load();
    this.loadPersons();
  }

  save(form: FormControl): void {
    this.bookEntryService.add(this.bookEntry)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento salvo com sucesso.' });
        form.reset();
        this.bookEntry = new BookEntry();
      })
      .catch(err => this.errorHandler.handle(err));
  }

  load(): Promise<void> {
    return this.categoryService.getAllCategories()
      .then(response => {
        this.categories = response.map(c => ({ label: c.name, value: c.id }));
      });
  }

  loadPersons(): void {
    this.personService.getAllPerson().then(response => {
      this.persons = response.map(p => ({ label: p.name, value: p.id }));
    });
  }
}
