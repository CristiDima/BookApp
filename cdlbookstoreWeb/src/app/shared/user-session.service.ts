import { User, UserAddress as Address, UserSession } from '../models/user.model';
import { Injectable } from '@angular/core';
import * as _ from "lodash";
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class UserSessionService {
    
    public user: User = null;
    public userSession: UserSession = null;
    
    constructor(private apiRequest: APIRequestService, private pathRequest: PathRequestService,
        private spinner: NgxSpinnerService) {
        const userDetails = JSON.parse(localStorage.getItem('currentUser'));
        const expirationTokenDate: Date = userDetails ? new Date(userDetails['tokenExpirationDate']) : null;
        if (userDetails && expirationTokenDate && expirationTokenDate.toUTCString() > new Date().toUTCString()) {
            this.getUser(userDetails['userId']);
            this.userSession = new UserSession();
            this.userSession.token = userDetails['token'];
        }
    }


    private getUser(userId: number) {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.userPath + '/' + userId).subscribe((responseData: User) => {
            this.user = responseData;
            this.userSession.userId = this.user.id;
            this.spinner.hide()
        }, error => {
            this.spinner.hide();
        });
    }

    public isAdmin(): boolean {
        if (_.isNil(this.user)){
            return false;
        }

        if (!this.user.admin) {
            return false;
        }

        return true;
    }

    public isLoggedIn(): boolean {
        if (_.isNil(this.user)){
            return false;
        }

        return true;
    }

    public get token(): string {
        const userDetails = JSON.parse(localStorage.getItem('currentUser'));
        const token: string = userDetails['token'];
        return token;
    }

    public get tokenExpirationDate(): Date {
        const userDetails = JSON.parse(localStorage.getItem('currentUser'));
        const tokenExpirationDate: Date = userDetails['tokenExpirationDate'];
        return tokenExpirationDate;
    }

    public isValidSession(): boolean {
        if (this.tokenExpirationDate > new Date) {
            return true;
        }
        return false;
    }
}