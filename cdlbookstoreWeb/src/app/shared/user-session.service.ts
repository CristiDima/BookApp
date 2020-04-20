import { User, UserAddress as Address, UserSession } from '../models/user.model';
import { Injectable } from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class UserSessionService {
    
    public user: User = null;
    public userSession: UserSession = null;
    
    constructor(){
        const userDetails = JSON.parse(localStorage.getItem('currentUser'));
        if (userDetails) {
            this.user = userDetails['user'];
            this.userSession = new UserSession();
            this.userSession.token = userDetails['token'];
        }

        if (this.userSession && this.user) {
            this.userSession.userId = this.user.id;
        }
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
}