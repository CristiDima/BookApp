import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PathRequestService } from '../../shared/path-request.service';
import { APIRequestService } from '../../shared/api-request.service';
import { ManagementBook } from './management-books.model';

@Injectable()
export class ManagementService {

    public orderdBooks: ManagementBook[] = [];
    public unreturnedBooks: ManagementBook[] = [];
    public returnedBooks: ManagementBook[] = [];

    private isOrderedRequestFinish = false;
    private isReturnedRequestFinish = false;
    private isUnreturnedRequestFinish = false;

    constructor(private pathRequest: PathRequestService, private apiRequest: APIRequestService, private spinner: NgxSpinnerService) {
        this.getUserDetails();
    }

    public get isLoadedInitialData(): boolean {
        return (this.isOrderedRequestFinish && this.isReturnedRequestFinish &&
            this.isUnreturnedRequestFinish);
    }


    //#region events
    private async getUserDetails() {
        this.getUnreturnedBooksRequest();
        this.getOrderedBooksRequest();
        this.getReturnedBooksRequest();
    }
    //#endregion

    //#region request
    private getUnreturnedBooksRequest(): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.expiredLoanPath).subscribe((responseData: Map<string, Map<string, any>>) => {
            if (responseData) {
                const arr = Object.entries(responseData);
                const map = new Map(arr);
                map.forEach(data => {
                    data.forEach(element => {
                        const book: ManagementBook = new ManagementBook();
                        book.address = element.address;
                        book.bookName = element.bookName;
                        book.city = element.city;
                        book.district = element.district;
                        book.clientName = element.clientName;
                        book.dateToReturn = element.dateToReturn;
                        book.email = element.email;
                        book.phoneNumber = element.phoneNumber;
                        book.remainedDays = element.remainedDays;
                        book.bookId = element.bookId;
                        book.userId = element.userId;
                        this.unreturnedBooks.push(book);
                    });
                });
            }
            this.isUnreturnedRequestFinish = true;
            this.spinner.hide();
        }, error => {
            this.isOrderedRequestFinish = true;
            this.spinner.hide();
        });
    }

    private getReturnedBooksRequest(): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.returnedPath).subscribe((responseData: Map<string, Map<string, any>>) => {
            if (responseData) {
                const arr = Object.entries(responseData);
                const map = new Map(arr);
                map.forEach(data => {
                    data.forEach(element => {
                        const book: ManagementBook = new ManagementBook();
                        book.address = element.address;
                        book.bookName = element.bookName;
                        book.city = element.city;
                        book.district = element.district;
                        book.clientName = element.clientName;
                        book.dateToReturn = element.dateToReturn;
                        book.email = element.email;
                        book.phoneNumber = element.phoneNumber;
                        book.remainedDays = element.remainedDays;
                        book.bookId = element.bookId;
                        book.userId = element.userId;
                        this.returnedBooks.push(book);
                    });
                });
            }
            this.isReturnedRequestFinish = true;
            this.spinner.hide();
        }, error => {
            this.isOrderedRequestFinish = true;
            this.spinner.hide();
        });
    }

    private getOrderedBooksRequest(): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.orderedPath).subscribe((responseData: Map<string, Map<string, any>>) => {
            if (responseData) {
                const arr = Object.entries(responseData);
                const map = new Map(arr);
                map.forEach(data => {
                    data.forEach(element => {
                        const book: ManagementBook = new ManagementBook();
                        book.address = element.address;
                        book.bookName = element.bookName;
                        book.city = element.city;
                        book.district = element.district;
                        book.clientName = element.clientName;
                        book.dateToReturn = element.dateToReturn;
                        book.email = element.email;
                        book.phoneNumber = element.phoneNumber;
                        book.remainedDays = element.remainedDays;
                        book.bookId = element.bookId;
                        book.userId = element.userId;
                        this.orderdBooks.push(book);
                    });
                });
            }
            this.isOrderedRequestFinish = true;
            this.spinner.hide();
        }, error => {
            this.isOrderedRequestFinish = true;
            this.spinner.hide();
        });
    }
    //#endregion
}
