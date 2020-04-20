import { Injectable } from '@angular/core';
import { UserCredentials, User, UserSession } from '../models/user.model';
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';
import { UserSessionService } from './user-session.service';
import { PagesRouting } from './pages-routing.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AuthenticationService {
    
    private incorrectCredentials: boolean = false;

    constructor(private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private userSessionService: UserSessionService, private _pagesRouting: PagesRouting,
                private spinner: NgxSpinnerService) {
    }

    //login region
    public login(userCredentials: UserCredentials): void {
       this.spinner.show();
        this.apiRequest.requst('POST', this.pathRequest.loginPath, userCredentials).subscribe((responseData: Map<string, any>) => {
            if (responseData) {
              this.userSessionService.user = responseData['user'];
              this.userSessionService.userSession = new UserSession();
              
              if ( this.userSessionService.user) {
                this._pagesRouting.HomePage();
                this.userSessionService.userSession.token =  responseData['token'];
                this.userSessionService.userSession.userId = this.userSessionService.user.id;
                this.userSessionService.user.email = userCredentials.username;
                const userDetails: any = {'user': this.userSessionService.user,'token': this.userSessionService.userSession.token}
                this.setLocalStorageValue('currentUser', userDetails);
                this.incorrectCredentials = false;
              }

            } else {
              this.incorrectCredentials = true;
            }
            this.spinner.hide();
        });
    }

    public logout(): void {
      this.removeLocalStorageValue('currentUser');
      this.userSessionService.user = null;
      this._pagesRouting.HomePage();
    }

    public resetPassword(email: string): void {
      this.spinner.show();
      this.apiRequest.requst('POST', this.pathRequest.resetPasswordPath, email).subscribe((responseDate: string) => {

        this.spinner.hide();
      });
    }

    public changePassword(password: string): void {
      this.spinner.show();
      this.apiRequest.requst('PUT', this.pathRequest.changePasswordPath, password).subscribe((responseDate: string) => {

        this.spinner.hide();
      });
    }
    //end region
   
    //region auth guard
    public isAuthenticated(): Promise<boolean> {
        const promise = new Promise<boolean>(
            (resolve, reject) => {
              setTimeout(() => {
                resolve(this.userSessionService.isLoggedIn());
              }, 800);
            }
          );
          return promise;
    }

    public isAdmin(): Promise<boolean> {
      const promise = new Promise<boolean>(
          (resolve, reject) => {
            setTimeout(() => {
              resolve(this.userSessionService.isAdmin());
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