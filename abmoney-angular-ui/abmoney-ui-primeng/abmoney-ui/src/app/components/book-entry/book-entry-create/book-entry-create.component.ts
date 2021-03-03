import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BookEntryService } from './../book-entry.service';
import { PersonService } from './../../person/person.service';
import { BookEntry } from './../../../model/book-entry';
import { ErrorHandlerService } from './../../../core/error-handler.service';
import { CategoryService } from './../../category/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const bookEntryId = this.route.snapshot.params['id'];

    if (bookEntryId) {
      this.loadBookEntryById(bookEntryId);
    }
    this.load();
    this.loadPersons();
  }

  loadBookEntryById(bookEntryId: number): void {
    this.bookEntryService.getBookEntryById(bookEntryId)
      .then(response => {
        this.bookEntry = response;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  getEditing(): boolean {
    return Boolean(this.bookEntry.id);
  }

  save(form: FormControl): void {
    if (this.getEditing()) {
      this.updateBookEntry(form);
    }
    else {
      this.addBookEntry(form);
    }

  }

  updateBookEntry(form: FormControl): void {
    this.bookEntryService.update(this.bookEntry)
      .then(response => {
        this.bookEntry = response;
        this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso.' });
      })
      .catch(error => this.errorHandler.handle(error));
  }

  addBookEntry(form: FormControl): void {
    this.bookEntryService.add(this.bookEntry)
      .then(response => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento salvo com sucesso.' });
        form.reset();
        this.bookEntry = new BookEntry();
        this.router.navigate(['lancamentos', response.id]);
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

  new(form: FormControl): void {
    form.reset();
    setTimeout(function () {
      this.bookEntry = new BookEntry();
    }.bind(this), 1);
    this.router.navigate(['/lancamentos/novo']);

  }
}
