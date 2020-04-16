import { Injectable } from '@angular/core';
import { UserLoginDetails, User } from '../models/user.model';
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';
import { UserSessionService } from './user-session.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PagesRouting } from './pages-routing.service';

@Injectable()
export class AuthenticationService {
    
    constructor(private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private _userSessionService: UserSessionService, private _pagesRouting: PagesRouting) {
    }


    //login region
    public login(userLoginDetails: UserLoginDetails): void {
        this._apiRequest.requst('POST', this._pathRequest.loginPath, userLoginDetails).subscribe((responseData: Map<string, any>) => {
            this._userSessionService.user = responseData['user'];
            this._userSessionService.userAddress = responseData['address'];
            if ( this._userSessionService.user) {
              this._userSessionService.user.email = userLoginDetails.username;
              const userDetails: any = {'user': this._userSessionService.user, 'address': this._userSessionService.userAddress}
              this.setLocalStorageValue('currentUser', userDetails);
            }
            this._pagesRouting.HomePage();
        });
    }

    public logout(): void {
      this.removeLocalStorageValue('currentUser');
      this._userSessionService.user = null;
      this._pagesRouting.HomePage();
    }

    public resetPassword(email: string): void {
      this._apiRequest.requst('POST', this._pathRequest.resetPasswordPath, email).subscribe((responseDate: string) => {

      });
    }

    public changePassword(password: string): void {
      this._apiRequest.requst('PUT', this._pathRequest.changePasswordPath, password).subscribe((responseDate: string) => {

      });
    }
    //end region
   
    //region auth guard
    public isAuthenticated(): Promise<boolean> {
        const promise = new Promise<boolean>(
            (resolve, reject) => {
              setTimeout(() => {
                resolve(this._userSessionService.isLoggedIn());
              }, 800);
            }
          );
          return promise;
    }

    public isAdmin(): Promise<boolean> {
      const promise = new Promise<boolean>(
          (resolve, reject) => {
            setTimeout(() => {
              resolve(this._userSessionService.isAdmin());
            }, 800);
          }
        );
        return promise;
  }
  //endregion

  //region local storage
  public setLocalStorageValue(name: string, value: any): void {
    localStorage.setItem(name, JSON.stringify(value));
  }

  public getLocalStorageValue(name: string): any {
    localStorage.getItem(name);
  }

  public removeLocalStorageValue(name: string): void {
    localStorage.removeItem(name);
  }
  //endregion

}