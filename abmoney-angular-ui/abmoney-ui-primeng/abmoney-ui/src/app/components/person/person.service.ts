import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Person {
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

  getPersons(person: Person): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3OTM3OTAsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiMGIxNDY4MWUtMDI0My00ZDhhLWE5ZWItZmE1NjBjNTgxOTllIiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.T1znzJXKYkYGHY_qxaw_ocjcB9F15dnqnw3xIj72mrk'
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
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3OTM3OTAsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiMGIxNDY4MWUtMDI0My00ZDhhLWE5ZWItZmE1NjBjNTgxOTllIiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.T1znzJXKYkYGHY_qxaw_ocjcB9F15dnqnw3xIj72mrk'
    );

    return this.http
      .get(this.baseUrl, { headers })
      .toPromise()
      .then((response) => response['content']);
  }

  search(filtro: Person): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3OTM3OTAsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiMGIxNDY4MWUtMDI0My00ZDhhLWE5ZWItZmE1NjBjNTgxOTllIiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.T1znzJXKYkYGHY_qxaw_ocjcB9F15dnqnw3xIj72mrk'
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
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3OTM3OTAsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiMGIxNDY4MWUtMDI0My00ZDhhLWE5ZWItZmE1NjBjNTgxOTllIiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.T1znzJXKYkYGHY_qxaw_ocjcB9F15dnqnw3xIj72mrk'
    );

    return this.http.delete(`${this.baseUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null);
  }

  updateStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3OTM3OTAsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiMGIxNDY4MWUtMDI0My00ZDhhLWE5ZWItZmE1NjBjNTgxOTllIiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.T1znzJXKYkYGHY_qxaw_ocjcB9F15dnqnw3xIj72mrk'
    )
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.baseUrl}/${id}/status`, status, { headers }).toPromise().then(() => null);
  }

}
