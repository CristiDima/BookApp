import { Component } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Router } from '@angular/router';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from 'src/app/dialog/confirmation.component';
import { BookService } from 'src/app/shared/book.service';
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import * as _ from 'lodash';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent {

    public selectedBook: Book = null;

    constructor(private router: Router, private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private spinner: NgxSpinnerService, private toastr: ToastrService, public dialog: MatDialog,
                private userDetailsService: UserDetailsService, private userSesion: UserSessionService,
                private apiMessage: APIMessagesService, private pagesRouting: PagesRouting) {
        if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.book) {
            this.selectedBook = this.router.getCurrentNavigation().extras.state.book;
        }
    }

    public get canBorrowBook(): boolean {
        return this.userDetailsService.isPhysicalSubcription &&
            this.userSesion.user.totalBooks > this.userDetailsService.loanedBooks.length;
    }

    public get canReadOnline(): boolean {
        return !_.isNil(this.selectedBook.uiFile);
    }

    public get isFavourite(): boolean {
        return this.userDetailsService.isFavouriteBook(this.selectedBook);
    }

    private canBorrowBooks(): boolean {
        return this.userSesion.user.totalBooks > this.userDetailsService.loanedBooks.length;
    }

    private isBookLoaned(): boolean {
        return this.userDetailsService.hasLoanedBook(this.selectedBook);
    }

    private isBookOnline(): boolean {
        return this.userDetailsService.hasOnlineBook(this.selectedBook);
    }

    private isBookAvailable(): boolean {
        return this.selectedBook.total > this.selectedBook.loaned;
    }

    //#region events
    public onRate(event: any): void {
        this.spinner.show();
        this.apiRequest.requst('POST', this.pathRequest.bookRating + '/' + this.selectedBook.id + '/' + this.userSesion.user.id,
        event.newValue).subscribe((responseData: any) => {
            this.selectedBook.rating = responseData.rating;
            this.selectedBook.votes = responseData.votes;
            event.newValue = Math.floor(this.selectedBook.rating);
            event.starRating._value = Math.floor(this.selectedBook.rating);
            this.spinner.hide();
        }, error => {
            const msg = 'An error occured. Please try again.';
            this.spinner.hide();
            this.toastr.error(msg);
        });
    }

    public onAddToWishlist(): void {
     if (this.isFavourite) {
         this.deleteFromWishlistRequest(this.selectedBook);
     } else {
         this.addToWishlistRequest(this.selectedBook);
     }
    }

    public onBorrowBook(): void {
        if (!this.canBorrowBooks()) {
            this.apiMessage.onMaxLimitBooksMsg();
            return;
        }

        if (this.isBookLoaned()) {
            this.apiMessage.onAlreadyLoanedBookMsg();
            return;
        }

        if (this.isBookAvailable()) {
            this.apiMessage.onNotAvailableBookMsg();
            return;
        }

        const message: string = 'Cartea va fi livrata la adresa: ' + this.userDetailsService.address.address +
            ',' + this.userDetailsService.address.city + ',' + this.userDetailsService.address.district;
        const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '500px',
            data: {message}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.borrowBookRequest(this.selectedBook);
            }
        });
    }

    public onReadBook(): void {
        if (this.isBookOnline()) {
            this.pagesRouting.PdfViewerPage(this.selectedBook);
            return;
        }
        this.addToOnlineLibraryRequest(this.selectedBook);
    }
    //#endregion

    //#region requests
    private borrowBookRequest(book: Book) {
        this.spinner.show();
        this.apiRequest.requst('POST', this.pathRequest.borrowPath + '/' + book.id, this.userSesion.user.id)
        .subscribe((responseData: Book) => {
            this.userDetailsService.loanedBooks.push(book);
            this.spinner.hide();
            this.apiMessage.onBorrowBookMsg(book);
        }, error => {
            this.spinner.hide();
            this.apiMessage.onNotAvailableBookMsg();
        });
    }

    private addToWishlistRequest(book: Book) {
        this.spinner.show();
        this.apiRequest.requst('POST', this.pathRequest.wishlistPath + '/' + book.id, this.userSesion.user.id)
        .subscribe((responseData: Book) => {
            this.userDetailsService.wishlist.push(responseData);
            this.apiMessage.onAddToWishlistMsg(book);
            this.spinner.hide();
        }, error => {
            this.apiMessage.onAddToWishlistMsg(error, true);
            this.spinner.hide();
        });
    }

    private deleteFromWishlistRequest(book: Book) {
        this.spinner.show();
        this.apiRequest.requst('DELETE', this.pathRequest.wishlistPath + '/' + book.id, this.userSesion.user.id)
        .subscribe((responseData: Book) => {
            const index: number = this.userDetailsService.wishlist.indexOf(responseData);
            this.userDetailsService.wishlist.splice(index, 1);
            this.apiMessage.onRemoveFromWishlistMsg(book);
            this.spinner.hide();
        }, error => {
            this.apiMessage.onRemoveFromWishlistMsg(error, true);
            this.spinner.hide();
        });
    }

    private addToOnlineLibraryRequest(book: Book) {
        this.spinner.show();
        this.apiRequest.requst('POST', this.pathRequest.onlinePath + '/' + book.id, this.userSesion.user.id)
        .subscribe((responseData: Book) => {
            this.userDetailsService.onlineBooks.push(responseData);
            this.apiMessage.onAddToEBookMsg(book);
            this.pagesRouting.PdfViewerPage(this.selectedBook);
            this.spinner.hide();
        }, error => {
            this.apiMessage.onAddToEBookMsg(error, true);
            this.spinner.hide();
        });
    }
    //#endregion
}
