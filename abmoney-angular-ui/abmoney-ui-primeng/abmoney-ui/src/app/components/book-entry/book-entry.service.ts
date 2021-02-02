import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class LancamentoFiltro {
  description: string;
  page = 0;
  linesPerPage = 5;
}

@Injectable({
  providedIn: 'root',
})
export class BookEntryService {
  baseUrl = 'http://localhost:8080/bookEntry';

  constructor(private http: HttpClient) {}

  read(filter: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTIzNjg1MTIsInVzZXJfbmFtZSI6ImFubmFAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiJdLCJqdGkiOiI1ZDg4MDBhYi00ODJjLTQxZDUtYTY0NC1iMjU3MDEwN2FiMTciLCJjbGllbnRfaWQiOiJteWFwcG5hbWUxMjMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.a8NMhqP_cL_2soe5Pt3tpP3P8tTriJ4k5gOD6intgoU'
    );

    let params = new HttpParams();

    if (filter.description) {
      params = params.set('description', filter.description);
    }

    return this.http
      .get(`${this.baseUrl}/filter?`, { headers, params })
      .toPromise()
      .then((response) => {
        const bookEntry = response['content'];
        const result = {
          bookEntry,
          total: response['totalElements'],
        };
        return result;
      });
  }
}
