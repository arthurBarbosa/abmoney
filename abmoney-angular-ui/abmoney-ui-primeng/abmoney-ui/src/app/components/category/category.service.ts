import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/categories`;
  }

  getAllCategories(): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4Nzk1NzYsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiNjE5YTA3M2ItYWNiZC00Y2ZlLWJhODktNDBhNWUxMGM4MTY1IiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.a8fHrErl3oKVy6k5JCmEfCEnIHdeYIqaKQB-c5FzBQE'
    );

    return this.http.get(`${this.baseUrl}`, { headers })
      .toPromise();
  }
}
