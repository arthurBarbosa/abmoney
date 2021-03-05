import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  // bookEntry = new BookEntry();
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private errorHandler: ErrorHandlerService,
    private personService: PersonService,
    private bookEntryService: BookEntryService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.configForm();
    const bookEntryId = this.route.snapshot.params['id'];

    this.title.setTitle('Novo lançamento');

    if (bookEntryId) {
      this.loadBookEntryById(bookEntryId);
    }
    this.load();
    this.loadPersons();
  }

  configForm(): void {
    this.form = this.formBuilder.group({
      id: [],
      type: ['RECEITA', Validators.required],
      dueDate: ['', Validators.required],
      paymentDate: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]],
      value: ['', Validators.required],
      person: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['']
      }),
      category: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['']
      }),
      observation: ['']
    });
  }

  loadBookEntryById(bookEntryId: number): void {
    this.bookEntryService.getBookEntryById(bookEntryId)
      .then(response => {
        // this.bookEntry = response;
        this.form.setValue(response);
        this.updateTitleUpdate();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  getEditing(): boolean {
    return Boolean(this.form.get('id').value);
  }

  save(): void {
    if (this.getEditing()) {
      this.updateBookEntry();
    }
    else {
      this.addBookEntry();
    }
  }

  updateBookEntry(): void {
    this.bookEntryService.update(this.form.value)
      .then(response => {
        // this.bookEntry = response;
        this.form.setValue(response);
        this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso.' });
        this.updateTitleUpdate();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  addBookEntry(): void {
    this.bookEntryService.add(this.form.value)
      .then(response => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento salvo com sucesso.' });
        this.form.reset();
        // this.bookEntry = new BookEntry();
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

  new(): void {
    this.form.reset();
    setTimeout(function () {
      this.bookEntry = new BookEntry();
    }.bind(this), 1);
    this.router.navigate(['/lancamentos/novo']);

  }



  updateTitleUpdate(): void {
    this.title.setTitle(`Edição de lançamento: ${this.form.get('description')}`);
  }
}
