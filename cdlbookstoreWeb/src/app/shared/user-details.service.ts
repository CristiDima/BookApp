import { UserSessionService } from './user-session.service';
import { Injectable } from '@angular/core';
import { UserOnlineSubscription, UserPhysicalSubscription, UserAddress } from '../models/user.model';
import { Book } from '../models/book.model';
import { PathRequestService } from './path-request.service';
import { APIRequestService } from './api-request.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class UserDetailsService {

    public userOnlineSubscription: UserOnlineSubscription = null;
    public userPhysicalSubscription: UserPhysicalSubscription = null;
    public loannedBooks: Book[] = [];
    public onlineBooks: Book[] = [];
    public readList: Book[] = [];
    public address: UserAddress = null;

    constructor(private userSession: UserSessionService, private pathRequest: PathRequestService,
                private apiRequest: APIRequestService, private spinner: NgxSpinnerService) {
        this.getUserDetails();
    }

    //event region
    private async getUserDetails() {
        if (!this.userSession.user) {
            return;
        }

        if (!this.userSession.user.id){
            return;
        }

        if (!this.userSession.user.addressId) {
            return;
        }

        this.getUserOnlineSubscriptionRequest(this.userSession.user.id);
        this.getUserPhysicalSubscriptionRequest(this.userSession.user.id);
        this.getLoannedBooksRequest(this.userSession.user.id);
        this.getOnlineBooksRequest(this.userSession.user.id);
        // this.getReadListRequest(this.userSession.user.id);
        this.getAddressRequest(this.userSession.user.addressId);

    }
    //endregion

    //requests region
    private getUserOnlineSubscriptionRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.onlineAccountPath + '/' + userId).subscribe((responseData: UserOnlineSubscription) => {
            if (responseData) {
                this.userOnlineSubscription = responseData;
            }
            this.spinner.hide();
        });
    }

    private getUserPhysicalSubscriptionRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET',  this.pathRequest.physicalAccountPath + '/' + userId).subscribe((responseData: UserPhysicalSubscription) => {
            if (responseData) {
                this.userPhysicalSubscription = responseData;
            }
            this.spinner.hide();
        });
    }

    private getLoannedBooksRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.loannedBookPath + '/' + userId).subscribe((responseData: Book[]) => {
            if (responseData) {
                this.loannedBooks = responseData;
            }
            this.spinner.hide();
        });
    }

    private getOnlineBooksRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.onlineBookPath + '/' + userId).subscribe((responseData: Book[]) => {
            if (responseData) {
                this.onlineBooks = responseData;
            }
            this.spinner.hide();
        });
    }

    private getReadListRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', '', userId).subscribe((responseData: Book[]) => {
            if (responseData) {
                this.readList = responseData;
            }
            this.spinner.hide();
        });
    }

    private getAddressRequest(addressId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.addressPath + '/' + addressId).subscribe((responseData: UserAddress) => {
            if (responseData) {
                this.address = responseData;
            }
            this.spinner.hide();
        });
    }
    //endregion
}