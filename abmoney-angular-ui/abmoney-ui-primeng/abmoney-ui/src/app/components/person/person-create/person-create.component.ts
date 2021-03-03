import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Person } from './../../../model/person';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../../core/error-handler.service';
import { PersonService } from './../person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {

  person = new Person();

  constructor(
    private personService: PersonService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova pessoa');

    const personId = this.route.snapshot.params['id'];

    if (personId) {
      this.loadPersonById(personId);
    }
  }

  loadPersonById(personId: number): void {
    this.personService.getPersonById(personId)
      .then(response => {
        this.person = response;
        this.updateTitleUpdate();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  save(form: FormControl): void {
    if (this.getEditing) {
      this.updatePerson(form);
    }
    else {
      this.addPerson(form);
    }
  }

  getEditing(): boolean {
    return Boolean(this.person.id);
  }

  updatePerson(form: FormControl): void {
    this.personService.updatePerson(this.person)
      .then(response => {
        this.person = response;
        this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso' });
      })
      .catch(error => this.errorHandler.handle(error));
  }

  addPerson(form: FormControl): void {
    this.personService.add(this.person).then(() => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso.' });
      form.reset();
      this.person = new Person();
    });
  }

  updateTitleUpdate(): void {
    this.title.setTitle(`Edição de lançamento: ${this.person.name}`);
  }
}
