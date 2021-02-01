import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class BookEntryService {
  baseUrl = 'http://localhost:8080/bookEntry';

  constructor(private http: HttpClient) {}

  read(): Observable<any[]> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTIyODExNTcsInVzZXJfbmFtZSI6ImFubmFAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiJdLCJqdGkiOiJjMmY1ZGQwOC1hMmVlLTRlMmEtOWI1Zi00NzI4OTA2NDU1NzUiLCJjbGllbnRfaWQiOiJteWFwcG5hbWUxMjMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.5jxMFafzu5wqwsVdGjdi_p13w70O7rsh4zNcMLsJwqs'
    );

    return this.http
      .get<any>(`${this.baseUrl}`, { headers })
      .pipe(map((obj) => obj));
  }
}
