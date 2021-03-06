import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isAccessTokenInvalid()) {
      console.log('navegação com access token invalida');

      return this.auth.getNewAccessToken().then(() => {
        if (this.auth.isAccessTokenInvalid()) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      });
    }

    if (route.data.roles && !this.auth.hasAnyPermissions(route.data.roles)) {
      this.router.navigate(['/page-not-found']);
      return false;
    }
    return true;
  }

}
