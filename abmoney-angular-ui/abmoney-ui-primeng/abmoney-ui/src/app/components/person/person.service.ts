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
  baseUrl = 'http://localhost:8080/persons';

  constructor(private http: HttpClient) { }

  getPersons(person: PersonFilter): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
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
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    );

    return this.http
      .get(this.baseUrl, { headers })
      .toPromise()
      .then((response) => response['content']);
  }

  search(filtro: PersonFilter): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    );
    let params = new HttpParams()
      .set('page', filtro.page.toString())
      .set('size', filtro.linesPerPage.toString());

    if (filtro.name) {
      params = params.set('name', filtro.name);
    }

    return this.http.get(`${this.baseUrl}/search?`, { headers, params })
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
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    );

    return this.http.delete(`${this.baseUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null);
  }

  updateStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    )
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.baseUrl}/${id}/status`, status, { headers }).toPromise().then(() => null);
  }

  add(person: Person): Promise<Person> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    ).append('Content-Type', 'application/json');

    return this.http.post<Person>(this.baseUrl, person, { headers }).toPromise();
  }

}
