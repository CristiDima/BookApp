import { Injectable } from '@angular/core';
import { UserCredentials, User, UserSession } from '../models/user.model';
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';
import { UserSessionService } from './user-session.service';
import { PagesRouting } from './pages-routing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval } from 'rxjs';

@Injectable()
export class AuthenticationService {
    
    public lastMouseMove: Date = new Date();
    private incorrectCredentials: boolean = false;
    

    constructor(private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private userSessionService: UserSessionService, private _pagesRouting: PagesRouting,
                private spinner: NgxSpinnerService) {
      interval(30000).subscribe(() => { // will execute every 30 seconds
        this.heartbeat()
      });
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
                const tokenExpirationDate = new Date();
                tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + 60);
                const currentUser: any = {'userId': this.userSessionService.user.id,
                    'token': this.userSessionService.userSession.token, 
                    'tokenExpirationDate': tokenExpirationDate}
                this.setLocalStorageValue('currentUser', currentUser);
                this.incorrectCredentials = false;
              }

            } else {
              this.incorrectCredentials = true;
            }
            this.spinner.hide();
        }, error => {
          this.incorrectCredentials = true;
          this.spinner.hide();
        });
    }

    public logout(): void {
      this.removeLocalStorageValue('currentUser');
      this.spinner.show();
      this.apiRequest.requst('PUT', this.pathRequest.logoutPath, this.userSessionService.userSession.token).subscribe(() => {
        this.userSessionService.user = null;
        this._pagesRouting.HomePage();
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }

    public resetPassword(email: string): void {
      this.spinner.show();
      this.apiRequest.requst('POST', this.pathRequest.resetPasswordPath, email).subscribe((responseDate: string) => {

        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }

    public changePassword(password: string): void {
      this.spinner.show();
      this.apiRequest.requst('PUT', this.pathRequest.changePasswordPath, password).subscribe((responseDate: string) => {

        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }

    public heartbeat(): void {
      if (!this.isAuthenticated()) {
        return;
      }
      const userDetails = JSON.parse(localStorage.getItem('currentUser'));
      if (!userDetails) {
        return;
      }
      const expirationTokenDate: Date = userDetails ? new Date(userDetails['tokenExpirationDate']) : null;
      if (expirationTokenDate.toUTCString() < new Date().toUTCString()) {
        if (this.lastMouseMove.toUTCString() < new Date().toUTCString()) {
          this.logout();
        } else {
          console.log('extend session');
          this.apiRequest.heartbeat();
        }
      } 
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