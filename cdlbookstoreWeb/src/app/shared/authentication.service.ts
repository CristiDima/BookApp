import { Injectable } from '@angular/core';
import { UserCredentials, User, UserSession } from '../models/user.model';
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';
import { UserSessionService } from './user-session.service';
import { PagesRouting } from './pages-routing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { APIMessagesService } from './api-messages.service';

@Injectable()
export class AuthenticationService {

    public lastMouseMove: Date = new Date();
    public isValidResponse = false;

    constructor(private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private userSessionService: UserSessionService, private pagesRouting: PagesRouting,
                private spinner: NgxSpinnerService, private apiMessage: APIMessagesService,
                private route: ActivatedRoute) {
      interval(3000000).subscribe(() => { // will execute every 30 seconds
        this.heartbeat();
      });
    }

    //#region auth
    public login(userCredentials: UserCredentials): void {
      this.spinner.show();
      this.apiRequest.requst('POST', this.pathRequest.loginPath, userCredentials)
      .subscribe((responseData: any) => {
          if (responseData) {
            this.userSessionService.user = responseData.user;
            this.userSessionService.userSession = new UserSession();
            if ( this.userSessionService.user) {
              this.pagesRouting.HomePage();
              this.userSessionService.userSession.token =  responseData.token;
              this.userSessionService.userSession.userId = this.userSessionService.user.id;
              this.userSessionService.user.email = userCredentials.username;
              const tokenExpirationDate = new Date();
              tokenExpirationDate.setMinutes(tokenExpirationDate.getMinutes() + 60);
              const currentUser: any = {userId: this.userSessionService.user.id,
                  token: this.userSessionService.userSession.token,
                  tokenExpirationDate, email: this.userSessionService.user.email};
              this.setLocalStorageValue('currentUser', currentUser);
            }

          } else {
            this.apiMessage.onLoginFailedMsg();
          }
          this.spinner.hide();
      }, error => {
        this.apiMessage.onLoginFailedMsg();
        this.spinner.hide();
      });
    }

    public logout(isSessionExpired?: boolean): void {
      this.removeLocalStorageValue('currentUser');
      this.spinner.show();
      this.apiRequest.requst('PUT', this.pathRequest.logoutPath, this.userSessionService.userSession.token).subscribe(() => {
        this.userSessionService.user = null;
        this.pagesRouting.HomePage();
        if (isSessionExpired) {
          this.apiMessage.onLogoutMsg(isSessionExpired, null);
        }
        this.pagesRouting.LoginPage();
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        this.apiMessage.onLogoutMsg(null, error);
      });
    }

    public resetPassword(email: string): void {
      this.spinner.show();
      this.apiRequest.requst('POST', this.pathRequest.resetPasswordPath, email).subscribe((responseData: string) => {
        this.spinner.hide();
        if (responseData) {
          this.apiMessage.onResetPassMsg();
        } else {
          this.apiMessage.onResetPassMsg(true);
          this.isValidResponse = false;
        }
      }, error => {
        this.spinner.hide();
        this.apiMessage.onResetPassMsg(error);
      });
    }

    public changePassword(password: string): void {
      this.spinner.show();
      let id: number = null;
      this.route.queryParams.subscribe(params => {
        id = params.id;
    });
      const userDetails: Map<string, any> = new Map<string, any>();
      userDetails.set('password', password);
      userDetails.set('userId', id);
      const convMap = {};
      userDetails.forEach((val: string, key: string) => {
        convMap[key] = val;
      });
      this.apiRequest.requst('PUT', this.pathRequest.changePasswordPath, convMap).subscribe((responseDate: string) => {
        if (responseDate) {
          this.apiMessage.onChangePassMsg();
        } else {
          this.apiMessage.onChangePassMsg(true);
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        this.apiMessage.onChangePassMsg(error);
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
      const expirationTokenDate: Date = userDetails ? new Date(userDetails.tokenExpirationDate) : null;
      const currentDate: Date = new Date();
      if (expirationTokenDate < currentDate) {
        currentDate.setMinutes(currentDate.getMinutes() - 30);
        if (this.lastMouseMove < currentDate) {
          this.logout(true);
        } else {
          this.apiRequest.heartbeat();
        }
      }
    }
    //#endregion

    //#region authguard
    public isAuthenticated(): Promise<boolean> {
        const promise = new Promise<boolean>(
            (resolve, reject) => {
              setTimeout(() => {
                resolve(this.userSessionService.isLoggedIn());
              });
            }
          );
        return promise;
    }

    public canResetPassword(token: string, userId: number): Observable<boolean> {
      return this.apiRequest.requst('GET', this.pathRequest.resetPasswordPath + '/' + userId + '/' + token);
    }

    public canCreateAccount(token: string, id: number): Observable<boolean> {
      return this.apiRequest.requst('GET', this.pathRequest.businessSignupPath + '/' + id + '/' + token);
    }

    public isAdmin(): Promise<boolean> {
      const promise = new Promise<boolean>(
          (resolve, reject) => {
            setTimeout(() => {
              resolve(this.userSessionService.isAdmin());
            });
          }
        );
      return promise;
  }

    public isBusiness(): Promise<boolean> {
      const promise = new Promise<boolean>(
          (resolve, reject) => {
            setTimeout(() => {
              resolve(this.userSessionService.isBusiness());
            });
          }
        );
      return promise;
    }

  public isUser(): Promise<boolean> {
    const promise = new Promise<boolean>(
        (resolve, reject) => {
          setTimeout(() => {
            resolve(this.userSessionService.isUser());
          });
        }
      );
    return promise;
  }
  //#endregion

  //#region local storage
  public setLocalStorageValue(name: string, value: any): void {
    localStorage.setItem(name, JSON.stringify(value));
  }

  public getLocalStorageValue(name: string): any {
    localStorage.getItem(name);
  }

  public removeLocalStorageValue(name: string): void {
    localStorage.removeItem(name);
  }
  //#endregion
}
