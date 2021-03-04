import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelp: JwtHelperService
  ) {
    this.loadToken();
  }

  login(username: string, password: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic bXlhcHBuYW1lMTIzOm15YXBwc2VjcmV0MTIz');

    const body = `username=${username}&password=${password}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then(response => {
        console.log(response);
        this.storeToken(response['access_token']);

      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error['error'] === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida');
          }
        }
        return Promise.reject(response);
      });
  }

  private storeToken(token: string): void {
    this.jwtPayload = this.jwtHelp.decodeToken(token);
    localStorage.setItem('token', token);
    console.log(this.jwtPayload);
  }

  private loadToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.storeToken(token);
    }
  }
}
