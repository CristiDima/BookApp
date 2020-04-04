import { Injectable } from '@angular/core';
import { UserLoginDetails, User } from '../models/user.model';
import { APIRequestService } from './api-request.service';
import { PathRequestService } from './path-request.service';

@Injectable()
export class AuthenticationService {
    
    constructor(private _apiRequest: APIRequestService, private _pathRequest: PathRequestService) {
    }

    public login(userLoginDetails: UserLoginDetails) {
        this._apiRequest.requst('POST', this._pathRequest.loginPath, userLoginDetails).subscribe((responseData: User) => {
            console.log(responseData);
        });
    }
}