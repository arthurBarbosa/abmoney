import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Person {
  name: string;
  page = 0;
  linesPerPage = 2;
}

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  baseUrl = 'http://localhost:8080/persons';

  constructor(private http: HttpClient) {}

  getPersons(person: Person): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTI0NDMxMDIsInVzZXJfbmFtZSI6ImFubmFAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiJdLCJqdGkiOiJlYmFiODgzNi1mMTAzLTQ2OTgtOTA0YS1jMzNmNTc5NTY2YzYiLCJjbGllbnRfaWQiOiJteWFwcG5hbWUxMjMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.PqmXt-ZyiMDoBTHAD_8OulPW3SCJ1p5q8D9zmkjirdU'
    );

    let params = new HttpParams()
      .set('page', person.page.toString())
      .set('linesPerPage', person.linesPerPage.toString());

    if (person.name) {
      params = params.set('name', person.name);
    }

    return this.http
      .get(`${this.baseUrl}`, { headers, params })
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
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTI0NDMxMDIsInVzZXJfbmFtZSI6ImFubmFAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiJdLCJqdGkiOiJlYmFiODgzNi1mMTAzLTQ2OTgtOTA0YS1jMzNmNTc5NTY2YzYiLCJjbGllbnRfaWQiOiJteWFwcG5hbWUxMjMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.PqmXt-ZyiMDoBTHAD_8OulPW3SCJ1p5q8D9zmkjirdU'
    );

    return this.http
      .get(this.baseUrl, { headers })
      .toPromise()
      .then((response) => response['content']);
  }
}
