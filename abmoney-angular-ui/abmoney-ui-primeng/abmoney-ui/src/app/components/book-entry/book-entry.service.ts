import { BookEntry } from './../../model/book-entry';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';


export class LancamentoFiltro {
  description: string;
  dueDate: Date;
  expirationDateBy: Date;
  page = 0;
  size = 5;
}

@Injectable({
  providedIn: 'root',
})
export class BookEntryService {
  baseUrl = 'http://localhost:8080/bookEntry';

  constructor(private http: HttpClient) { }

  // read(filter: LancamentoFiltro): Observable<any[]> {
  //   const headers = new HttpHeaders().append(
  //     'Authorization',
  //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTI0NDMxMDIsInVzZXJfbmFtZSI6ImFubmFAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiJdLCJqdGkiOiJlYmFiODgzNi1mMTAzLTQ2OTgtOTA0YS1jMzNmNTc5NTY2YzYiLCJjbGllbnRfaWQiOiJteWFwcG5hbWUxMjMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.PqmXt-ZyiMDoBTHAD_8OulPW3SCJ1p5q8D9zmkjirdU'
  //   );

  //   let params = new HttpParams();
  //   // params.set('page', filter.page);
  //   // params.set('size', filter.size);

  //   if (filter.description) {
  //     params = params.set('description', filter.description);
  //   }

  //   return this.http
  //     .get<any[]>(`${this.baseUrl}/filter?${params.toString()}`, {
  //       headers,
  //       params,
  //     })
  //     .pipe(map((obj) => obj));
  // }

  getBookEntry(filter: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    );
    let params = new HttpParams()

      .set('page', filter.page.toString())
      .set('size', filter.size.toString());

    if (filter.description) {
      params = params.set('description', filter.description);
    }

    if (filter.dueDate) {
      params = params.set(
        'dueDate',
        moment(filter.dueDate).format('YYYY-MM-DD')
      );
    }

    if (filter.expirationDateBy) {
      params = params.set(
        'expirationDateBy',
        moment(filter.expirationDateBy).format('YYYY-MM-DD')
      );
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

  delete(id: number): Promise<void> {

    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    );

    return this.http.delete(`${this.baseUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null);
  }

  add(bookEntry: BookEntry): Promise<BookEntry> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    ).append('Content-Type', 'application/json');

    return this.http.post<BookEntry>(this.baseUrl, bookEntry, { headers }).toPromise();
  }

  update(bookEntry: BookEntry): Promise<BookEntry> {

    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    ).append('Content-Type', 'application/json');

    return this.http.put(`${this.baseUrl}/${bookEntry.id}`,
      JSON.stringify(bookEntry), { headers })
      .toPromise()
      .then(response => {
        const bookEntryUpdate = response as BookEntry;

        this.converterStringForDate([bookEntryUpdate]);

        return bookEntryUpdate;
      });

  }

  getBookEntryById(id: number): Promise<BookEntry> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    );

    return this.http.get(`${this.baseUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        const bookEntry = response as BookEntry;

        this.converterStringForDate([bookEntry]);

        return bookEntry;
      });
  }

  private converterStringForDate(bookEntries: BookEntry[]): void {
    for (const bookEntry of bookEntries) {
      bookEntry.dueDate = moment(bookEntry.dueDate, 'YYYY-MM-DD').toDate();

      if (bookEntry.paymentDate) {
        bookEntry.paymentDate = moment(bookEntry.paymentDate, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
