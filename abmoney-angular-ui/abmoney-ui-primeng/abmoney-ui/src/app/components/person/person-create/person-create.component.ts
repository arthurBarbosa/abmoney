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
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  save(form: FormControl): void {
    this.personService.add(this.person).then(() => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso.' });
      form.reset();
      this.person = new Person();
    });
  }
}
