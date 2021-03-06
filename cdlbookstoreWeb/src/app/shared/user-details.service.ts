import { UserSessionService } from './user-session.service';
import { Injectable } from '@angular/core';
import {UserPhysicalSubscription, UserAddress, UserBusinessSubscription } from '../models/user.model';
import { Book } from '../models/book.model';
import { PathRequestService } from './path-request.service';
import { APIRequestService } from './api-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileSaveService } from './file-save.service';
import { BookService } from './book.service';
import { Subject } from 'rxjs';

@Injectable()
export class UserDetailsService {

    public isBooksDownloadedSubject: Subject<boolean> = new Subject<boolean>();

    public userPhysicalSubscription: UserPhysicalSubscription = null;
    public userBusinessSubscription: UserBusinessSubscription = null;
    public loanedBooks: Book[] = [];
    public onlineBooks: Book[] = [];
    public wishlist: Book[] = [];
    public library: Book[] = [];
    public address: UserAddress = null;

    private isUserPhysicalSubscriptionRequestFinish = false;
    private isLoannedBooksRequestFinish = false;
    private isOnlineBooksRequestFinish = false;
    private isAddressRequestFinish = false;
    private isWishlistRequestFinish = false;
    private isLibraryRequestFinish = false;

    constructor(private userSession: UserSessionService, private pathRequest: PathRequestService, private bookService: BookService,
                private apiRequest: APIRequestService, private spinner: NgxSpinnerService, private fileService: FileSaveService) {
        this.getUserDetails();
    }

    public get isLoadedInitialData(): boolean {
        return ( this.isLoannedBooksRequestFinish && this.isOnlineBooksRequestFinish &&
            this.isWishlistRequestFinish && this.isLibraryRequestFinish);
    }

    public get isPhysicalSubcription(): boolean {
        if ((this.userPhysicalSubscription && this.userPhysicalSubscription.valid) ||
            (this.userBusinessSubscription && this.userBusinessSubscription.valid)) {
            return true;
        }

        return false;
    }

    public get isBusinessSubscription(): boolean {
        if (this.userBusinessSubscription && this.userBusinessSubscription.valid) {
            return true;
        }

        return false;
    }

    public hasOnlineBook(book: Book): boolean {
        if (!book) {
            return false;
        }

        const origBook: Book = this.onlineBooks.filter(el => el.name === book.name)[0];

        if (origBook) {
            return true;
        }

        return false;

    }

    public hasWishlistBook(book: Book): boolean {
        if (!book) {
            return false;
        }

        const origBook: Book = this.wishlist.filter(el => el.name === book.name)[0];

        if (origBook) {
            return true;
        }

        return false;
    }

    public hasLoanedBook(book: Book): boolean {
        if (!book) {
            return false;
        }

        const origBook: Book = this.loanedBooks.filter(el => el.name === book.name)[0];

        if (origBook) {
            return true;
        }

        return false;
    }

    public isFavouriteBook(book: Book) {
        const favBook: Book = this.wishlist.filter(el => el.name === book.name)[0];
        if (favBook) {
            return true;
        }

        return false;
    }

    //#region events
    private async getUserDetails() {
        if (!this.userSession.user) {
            return;
        }

        if (!this.userSession.user.id) {
            return;
        }

        if (!this.userSession.user.addressId) {
            return;
        }

        if (this.userSession.user.fromBusiness || this.userSession.user.business) {
            this.isUserPhysicalSubscriptionRequestFinish = true;
            this.getBusinessSubscriptionRequest(this.userSession.user.id);
        } else {
            this.getUserPhysicalSubscriptionRequest(this.userSession.user.id);
        }

        this.getLoanedBooksRequest(this.userSession.user.id);
        this.getOnlineBooksRequest(this.userSession.user.id);
        this.getWishlistRequest(this.userSession.user.id);
        this.getLibraryRequest(this.userSession.user.id);
        this.getAddressRequest(this.userSession.user.addressId);

    }
    //#endregion

    //#region requests
    private getBusinessSubscriptionRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.businessAccountPath + '/' + userId)
        .subscribe((responseData: UserBusinessSubscription) => {
            if (responseData) {
                this.userBusinessSubscription = responseData;
            }
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
        });
    }

    private getUserPhysicalSubscriptionRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET',  this.pathRequest.physicalAccountPath + '/' + userId)
        .subscribe((responseData: UserPhysicalSubscription) => {
            if (responseData) {
                this.userPhysicalSubscription = responseData;
            }
            this.spinner.hide();
            this.isUserPhysicalSubscriptionRequestFinish = true;
        }, error => {
            if (error.error === null) {
                this.isUserPhysicalSubscriptionRequestFinish = true;
            }
            this.spinner.hide();
        });
    }

    private getLoanedBooksRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.loanedBookPath + '/' + userId)
        .subscribe((responseData: Book[]) => {
            if (responseData) {
                this.loanedBooks = responseData;
                this.loanedBooks.forEach(book => {
                    const tempBook: Book = this.bookService.getBookById(book.id);
                    if (tempBook) {
                        book.uiFile = tempBook.uiFile;
                        book.uiImage = tempBook.uiImage;
                        book.authors = tempBook.authors;
                    } else {
                        this.fileService.getBookPdf(book);
                        this.fileService.getBookImg(book);
                        this.bookService.getAuthorPhoto(book.authors);
                    }
                    if (!book.uiFile && book.file) {
                        this.fileService.getBookPdf(book);
                    }

                    if (!book.uiImage && book.photo) {
                        this.fileService.getBookImg(book);
                    }
                });
            }
            this.spinner.hide();
            this.isLoannedBooksRequestFinish = true;
            if (this.isLoadedInitialData) {
                this.isBooksDownloadedSubject.next(true);
            }
        }, error => {
            this.isLoannedBooksRequestFinish = true;
            this.spinner.hide();
        });
    }

    private getOnlineBooksRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.onlineBookPath + '/' + userId)
        .subscribe((responseData: Book[]) => {
            if (responseData) {
                this.onlineBooks = responseData;
                this.onlineBooks.forEach(book => {
                    const tempBook: Book = this.bookService.getBookById(book.id);
                    if (tempBook) {
                        book.uiFile = tempBook.uiFile;
                        book.uiImage = tempBook.uiImage;
                        book.authors = tempBook.authors;
                    } else {
                        this.fileService.getBookPdf(book);
                        this.fileService.getBookImg(book);
                        this.bookService.getAuthorPhoto(book.authors);
                    }

                    if (!book.uiFile && book.file) {
                        this.fileService.getBookPdf(book);
                    }

                    if (!book.uiImage && book.photo) {
                        this.fileService.getBookImg(book);
                    }
                });
            }
            this.spinner.hide();
            this.isOnlineBooksRequestFinish = true;
            if (this.isLoadedInitialData) {
                this.isBooksDownloadedSubject.next(true);
            }
        }, error => {
            this.isOnlineBooksRequestFinish = true;
            this.spinner.hide();
        });
    }

    private getWishlistRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.wishlistPath + '/' + userId)
        .subscribe((responseData: Book[]) => {
            if (responseData) {
                this.wishlist = responseData;
                this.wishlist.forEach(book => {
                    const tempBook: Book = this.bookService.getBookById(book.id);
                    if (tempBook) {
                        book.uiFile = tempBook.uiFile;
                        book.uiImage = tempBook.uiImage;
                        book.authors = tempBook.authors;
                    } else {
                        this.fileService.getBookPdf(book);
                        this.fileService.getBookImg(book);
                        this.bookService.getAuthorPhoto(book.authors);
                    }

                    if (!book.uiFile && book.file) {
                        this.fileService.getBookPdf(book);
                    }

                    if (!book.uiImage && book.photo) {
                        this.fileService.getBookImg(book);
                    }
                });
            }
            this.isWishlistRequestFinish = true;
            if (this.isLoadedInitialData) {
                this.isBooksDownloadedSubject.next(true);
            }
            this.spinner.hide();
        }, error => {
            this.isWishlistRequestFinish = true;
            this.spinner.hide();
        });
    }

    private getLibraryRequest(userId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.libraryPath + '/' + userId)
        .subscribe((responseData: Book[]) => {
            if (responseData) {
                this.library = responseData;
                this.library.forEach(book => {
                    const tempBook: Book = this.bookService.getBookById(book.id);
                    if (tempBook) {
                        book.uiFile = tempBook.uiFile;
                        book.uiImage = tempBook.uiImage;
                        book.authors = tempBook.authors;
                    } else {
                        this.fileService.getBookPdf(book);
                        this.fileService.getBookImg(book);
                        this.bookService.getAuthorPhoto(book.authors);
                    }

                    if (!book.uiFile && book.file) {
                        this.fileService.getBookPdf(book);
                    }

                    if (!book.uiImage && book.photo) {
                        this.fileService.getBookImg(book);
                    }
                });
            }
            this.isLibraryRequestFinish = true;
            if (this.isLoadedInitialData) {
                this.isBooksDownloadedSubject.next(true);
            }
            this.spinner.hide();
        }, error => {
            this.isLibraryRequestFinish = true;
            this.spinner.hide();
        });
    }

    private getAddressRequest(addressId: number): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.addressPath + '/' + addressId)
        .subscribe((responseData: UserAddress) => {
            if (responseData) {
                this.address = responseData;
            }
            this.spinner.hide();
            this.isAddressRequestFinish = true;
        }, error => {
            this.isAddressRequestFinish = true;
            this.spinner.hide();
        });
    }
    //#endregion
}
