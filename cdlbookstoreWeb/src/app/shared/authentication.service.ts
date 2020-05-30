import { Injectable } from '@angular/core';
import { UserCredentials, User, UserSession } from '../models/user.model';
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';
import { UserSessionService } from './user-session.service';
import { PagesRouting } from './pages-routing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthenticationService {
    
    public lastMouseMove: Date = new Date();
    public isValidResponse: boolean = false;

    constructor(private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private userSessionService: UserSessionService, private _pagesRouting: PagesRouting,
                private spinner: NgxSpinnerService, private toastr: ToastrService,
                private route: ActivatedRoute) {
      interval(3000000).subscribe(() => { // will execute every 30 seconds
        // this.heartbeat()
      });
    }

    //login region
    public login(userCredentials: UserCredentials): void {
      const msg: string = 'Email or password are incorrect';
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
                    'tokenExpirationDate': tokenExpirationDate, 'email': this.userSessionService.user.email};
                this.setLocalStorageValue('currentUser', currentUser);
                
              }

            } else {
              this.toastr.error(msg);
            }
            this.spinner.hide();
        }, error => {
          this.toastr.error(msg);
          this.spinner.hide();
        });
    }

    public logout(msg?: string): void {
      this.removeLocalStorageValue('currentUser');
      this.spinner.show();
      let logOutMsg: string = ''
      if (msg) {
        logOutMsg = msg;
      }
      this.apiRequest.requst('PUT', this.pathRequest.logoutPath, this.userSessionService.userSession.token).subscribe(() => {
        this.userSessionService.user = null;
        this._pagesRouting.HomePage();
        if (msg) {
          this.toastr.warning(logOutMsg);
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        this.toastr.warning('Logut failed');
      });
    }

    public resetPassword(email: string): void {
      const errorMsg: string = 'Email address is invalid, please try again';
      const successMsg: string = 'An email to reset your password was send';
      this.spinner.show();
      this.apiRequest.requst('POST', this.pathRequest.resetPasswordPath, email).subscribe((responseData: string) => {
        this.spinner.hide();
        if (responseData) {
          this.toastr.error(successMsg);
        } else {
          this.toastr.error(errorMsg);
          this.isValidResponse = false;
        }
      }, error => {
        this.spinner.hide();
        this.toastr.error(errorMsg);
      });
    }

    public changePassword(password: string): void {
      this.spinner.show();
      const successMsg: string = 'Your password was changed';
      const errorMsg: string = 'An error occured, your password was not changed, please try again';
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
          this.toastr.success(successMsg);
        } else {
          this.toastr.error(errorMsg);
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        this.toastr.error(errorMsg);
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
          const sessionExpiredMsg = 'Your session has expired';
          this.logout(sessionExpiredMsg);
        } else {
          this.apiRequest.heartbeat();
        }
      }
    }
    //#endregion
   
    //region auth guard
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