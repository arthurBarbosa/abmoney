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

  getBookEntry(filter: LancamentoFiltro): Promise<any> {

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
      .get(`${this.baseUrl}/filter?`, { params })
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

    return this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  add(bookEntry: BookEntry): Promise<BookEntry> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post<BookEntry>(this.baseUrl, bookEntry, { headers }).toPromise();
  }

  update(bookEntry: BookEntry): Promise<BookEntry> {

    const headers = new HttpHeaders().append('Content-Type', 'application/json');

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
    return this.http.get(`${this.baseUrl}/${id}`)
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
