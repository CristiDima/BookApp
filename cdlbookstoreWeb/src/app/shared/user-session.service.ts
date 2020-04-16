import { User, UserAddress } from '../models/user.model';
import { Injectable } from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class UserSessionService {
    
    public user: User = null;
    public userAddress: UserAddress = null;
    
    constructor(){
        const userDetails = JSON.parse(localStorage.getItem('currentUser'));
        if (userDetails) {
            this.user = userDetails['user'];
            this.userAddress = userDetails['address'];
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