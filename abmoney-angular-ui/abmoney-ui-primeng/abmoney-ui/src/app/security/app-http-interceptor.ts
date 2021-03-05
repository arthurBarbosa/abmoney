import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalid()) {
      return from(this.auth.getNewAccessToken())
        .pipe(mergeMap(() => {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          return next.handle(req);
        }));
    }
    return next.handle(req);
  }
}
