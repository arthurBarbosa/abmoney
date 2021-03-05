import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;
  nameUserLogged: string;

  constructor(
    private http: HttpClient,
    private jwtHelp: JwtHelperService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loadToken();
  }

  login(username: string, password: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic bXlhcHBuYW1lMTIzOm15YXBwc2VjcmV0MTIz');

    const body = `username=${username}&password=${password}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        console.log(response);
        this.storeToken(response['access_token']);
        this.storeRefreshToken(response['refresh_token']);
        this.nameUserLogged = response['name'];
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
  }

  private storeRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken);
  }

  isAccessTokenInvalid(): boolean {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelp.isTokenExpired(token);
  }

  getRefreshTokenLocalStorage(): string {
    const refreshToken = localStorage.getItem('refresh_token');
    // if (this.jwtHelp.isTokenExpired(refreshToken)) {
    //   this.router.navigate(['login']);
    //   this.messageService.add({ severity: 'error', detail: 'Sua sessão expirou. Faça login novamente.' });
    // }
    return localStorage.getItem('refresh_token');
  }

  lougout(): void {
    const token = localStorage.getItem('token');
    if (!this.jwtHelp.isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      this.router.navigate(['login']);

    }
  }

  private loadToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.storeToken(token);
    }
  }

  hasAuthority(authority: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(authority);
  }

  hasAnyPermissions(roles): boolean {
    for (const role of roles) {
      if (this.hasAuthority(role)) {
        return true;
      }
    }
    return false;
  }



  getNewAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic bXlhcHBuYW1lMTIzOm15YXBwc2VjcmV0MTIz');

    const body = `grant_type=refresh_token&refresh_token=${this.getRefreshTokenLocalStorage()}`;

    return this.http.post(this.oauthTokenUrl, body, { headers }).toPromise()
      .then(response => {
        this.storeToken(response['access_token']);
      })
      .catch(response => {
        return Promise.resolve(null);
      });
  }
}
