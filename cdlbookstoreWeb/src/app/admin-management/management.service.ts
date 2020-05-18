import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PathRequestService } from '../shared/path-request.service';
import { APIRequestService } from '../shared/api-request.service';
import { ManagementBook } from './management-books.model';

@Injectable()
export class ManagementService {

    public orderdBooks: ManagementBook[] = [];
    public expiredLoan: ManagementBook[] = [];
    public returnedBooks: ManagementBook[] = [];

    private isOrderedRequestFinish: boolean = false;
    private isReturnedRequestFinish: boolean = false;
    private isExpiredFinish: boolean = false;

    constructor(private pathRequest: PathRequestService, private apiRequest: APIRequestService, private spinner: NgxSpinnerService) {
        this.getUserDetails();
    }

    public get isLoadedInitialData(): boolean {
        return (this.isOrderedRequestFinish && this.isReturnedRequestFinish &&
            this.isExpiredFinish)
    }


    //event region
    private async getUserDetails() {
        this.getExpiredBooksRequest();
        this.getOrderedBooksRequest();
        this.getReturnedBooksRequest();
    }
    //endregion

    //requests region
    private getExpiredBooksRequest(): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.expiredLoanPath).subscribe((responseData: Map<string, Map<string, any>>) => {
            if (responseData) {
                const arr = Object.entries(responseData);
                const map = new Map(arr);
                map.forEach(data => {
                    const book: ManagementBook = new ManagementBook();
                    book.address = data['address'];
                    book.bookName = data['bookName'];
                    book.city = data['city'];
                    book.district = data['district'];
                    book.clientName = data['clientName'];
                    book.dateToReturn = data['dateToReturn']
                    book.email = data['email'];
                    book.phoneNumber = data['phoneNumber'];
                    book.remainedDays = data['remainedDays'];
                    book.bookId = data['bookId'];
                    book.userId = data['userId'];
                    this.expiredLoan.push(book);
                });
            }
            this.isExpiredFinish = true;
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
                    const book: ManagementBook = new ManagementBook();
                    book.address = data['address'];
                    book.bookName = data['bookName'];
                    book.city = data['city'];
                    book.district = data['district'];
                    book.clientName = data['clientName'];
                    book.dateToReturn = data['dateToReturn']
                    book.email = data['email'];
                    book.phoneNumber = data['phoneNumber'];
                    book.remainedDays = data['remainedDays'];
                    book.bookId = data['bookId'];
                    book.userId = data['userId'];
                    this.returnedBooks.push(book);
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
                    const book: ManagementBook = new ManagementBook();
                    book.address = data['address'];
                    book.bookName = data['bookName'];
                    book.city = data['city'];
                    book.district = data['district'];
                    book.clientName = data['clientName'];
                    book.dateToReturn = data['dateToReturn']
                    book.email = data['email'];
                    book.phoneNumber = data['phoneNumber'];
                    book.remainedDays = data['remainedDays'];
                    book.bookId = data['bookId'];
                    book.userId = data['userId'];
                    this.orderdBooks.push(book);
                });
            }
            this.isOrderedRequestFinish = true;
            this.spinner.hide();
        }, error => {
            this.isOrderedRequestFinish = true;
            this.spinner.hide();
        });
    }
    //endregion
}