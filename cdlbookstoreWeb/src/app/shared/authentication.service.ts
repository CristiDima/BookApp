import { Injectable } from '@angular/core';
import { UserCredentials, User, UserSession } from '../models/user.model';
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';
import { UserSessionService } from './user-session.service';
import { PagesRouting } from './pages-routing.service';

@Injectable()
export class AuthenticationService {
    
    private incorrectCredentials: boolean = false;

    constructor(private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private _userSessionService: UserSessionService, private _pagesRouting: PagesRouting) {
    }

    //login region
    public login(userCredentials: UserCredentials): void {
        this._apiRequest.requst('POST', this._pathRequest.loginPath, userCredentials).subscribe((responseData: Map<string, any>) => {
            if (responseData) {
              this._userSessionService.user = responseData['user'];
              this._userSessionService.address = responseData['address'];
              this._userSessionService.userSession = new UserSession();
              
              if ( this._userSessionService.user) {
                this._pagesRouting.HomePage();
                this._userSessionService.userSession.token =  responseData['token'];
                this._userSessionService.userSession.userId = this._userSessionService.user.id;
                this._userSessionService.user.email = userCredentials.username;
                const userDetails: any = {'user': this._userSessionService.user, 'address': this._userSessionService.address, 
                                          'token': this._userSessionService.userSession.token}
                this.setLocalStorageValue('currentUser', userDetails);
                this.incorrectCredentials = false;
              }

            } else {
              this.incorrectCredentials = true;
            }
        }, error => {
          // this.incorrectCredentials = true;
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