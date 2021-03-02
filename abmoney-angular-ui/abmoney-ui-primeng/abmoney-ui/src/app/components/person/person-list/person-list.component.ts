import { LazyLoadEvent } from 'primeng/api';
import { Person, PersonService } from './../person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  linesPerPage = 0;
  size = 5;
  person = new Person();
  persons: any[];

  constructor(private personService: PersonService) { }

  ngOnInit(): void { this.list(); }

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

}
