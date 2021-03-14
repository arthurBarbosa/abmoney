import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  bookEntryUrl: string;

  constructor(private http: HttpClient) {
    this.bookEntryUrl = `${environment.apiUrl}/bookEntry`
  }

  bookEntryByCategory(): Promise<any> {
    return this.http.get<any>(`${this.bookEntryUrl}/statistics-by-category`)
      .toPromise();
  }

  bookEntryByDay(): Promise<any> {
    return this.http.get<any>(`${this.bookEntryUrl}/statistics-by-day`)
      .toPromise()
      .then(response => {
        this.converterStringsParaDate(response);

        return response;
      });
  }

  private converterStringsParaDate(data: Array<any>) {
    for (const dadoActual of data) {
      dadoActual.day = moment(dadoActual.day, 'YYYY-MM-DD').toDate();
    }
  }
}
