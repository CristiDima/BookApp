import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ResetPassGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token: string = route.queryParams.token;
    const id: number = route.queryParams.id;
    if (!token || !id) {
      return false;
    }
    return this.authService.canResetPassword(token, id).pipe(
      map(response =>
        {
          console.log(response);
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
