import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'http://localhost:8080/categories';
  constructor(private http: HttpClient) { }

  getAllCategories(): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3OTM3OTAsInVzZXJfbmFtZSI6ImphY2tAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9PUEVSQVRPUiIsIlJPTEVfQURNSU4iXSwianRpIjoiMGIxNDY4MWUtMDI0My00ZDhhLWE5ZWItZmE1NjBjNTgxOTllIiwiY2xpZW50X2lkIjoibXlhcHBuYW1lMTIzIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.T1znzJXKYkYGHY_qxaw_ocjcB9F15dnqnw3xIj72mrk'
    );

    return this.http.get(`${this.baseUrl}`, { headers })
      .toPromise();
  }
}
