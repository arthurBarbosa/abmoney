import { environment } from './../../../environments/environment';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../../model/person';

export class PersonFilter {
  name: string;
  page = 0;
  linesPerPage = 5;
  size = 5;
}

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/persons`;
  }

  getPersons(person: PersonFilter): Promise<any> {

    let params = new HttpParams()
      .set('page', person.page.toString())
      .set('linesPerPage', person.linesPerPage.toString());

    if (person.name) {
      params = params.set('name', person.name);
    }

    return this.http
      .get(`${this.baseUrl}`, { params })
      .toPromise()
      .then((response) => {
        const persons = response['content'];
        const result = {
          persons,
          total: response['totalElements'],
        };
        return result;
      });
  }

  getAllPerson(): Promise<any> {
    return this.http
      .get(this.baseUrl)
      .toPromise()
      .then((response) => response['content']);
  }

  search(filtro: PersonFilter): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.page.toString())
      .set('size', filtro.linesPerPage.toString());

    if (filtro.name) {
      params = params.set('name', filtro.name);
    }

    return this.http.get(`${this.baseUrl}/search?`, { params })
      .toPromise()
      .then(response => {
        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  delete(id: any): Promise<void> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  updateStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.put(`${this.baseUrl}/${id}/status`, status, { headers }).toPromise().then(() => null);
  }

  add(person: Person): Promise<Person> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post<Person>(this.baseUrl, person, { headers }).toPromise();
  }

  updatePerson(person: Person): Promise<Person> {

    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.put(`${this.baseUrl}/${person.id}`, JSON.stringify(person), { headers })
      .toPromise()
      .then(response => {
        const personUpdate = response as Person;
        return personUpdate;
      });
  }

  getPersonById(id: number): Promise<Person> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.get(`${this.baseUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        const person = response as Person;

        return person;
      });
  }

}
