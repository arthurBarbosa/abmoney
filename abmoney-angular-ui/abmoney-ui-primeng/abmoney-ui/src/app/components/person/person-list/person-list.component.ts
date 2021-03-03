import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../../core/error-handler.service';
import { Table } from 'primeng/table';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { PersonFilter, PersonService } from './../person.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  linesPerPage = 0;
  size = 5;
  person = new PersonFilter();
  persons: any[];

  @ViewChild('table') grid: Table;

  constructor(
    private personService: PersonService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de pesssoas');
    this.list();
  }

  list(page = 0): void {
    this.person.page = page;

    this.personService.getPersons(this.person).then((result) => {
      this.linesPerPage = result.total;
      this.persons = result.persons;
    });
  }

  search(page = 0): void {
    this.person.page = page;

    this.personService.search(this.person)
      .then(resultado => {
        this.linesPerPage = resultado.total;
        this.persons = resultado.pessoas;
      });
  }

  changePage(event: LazyLoadEvent): void {
    const page = event.first / event.rows;
    this.list(page);
  }

  confirm(person: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.delete(person);
      }
    });
  }

  delete(person: any): void {
    this.personService.delete(person.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.list();
        } else {
          this.grid.reset();
        }
        this.messageService
          .add({ severity: 'success', detail: 'Pessoa excluída com sucesso.' });

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  updateStatus(person: any): void {
    const newStatus = !person.status;

    this.personService.updateStatus(person.id, newStatus)
      .then(() => {
        const status = newStatus ? 'ativada' : 'desativada';
        person.status = newStatus;
        this.messageService.add({ severity: 'success', detail: `Pessoa ${status} com sucesso!` });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
