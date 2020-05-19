import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class SignupGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token: string = route.queryParams.token;
    const companyName: string = route.queryParams.id;
    if (!token || !companyName) {
      return false;
    }
    return this.authService.canCreateAccount(token, companyName).pipe(
      map(response =>
        {
          if (response === true) {
            return true;
          } else {
            return false;
          }
    }));
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
