import { Input, Component } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Router } from '@angular/router';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { UserDetailsService } from 'src/app/shared/user-details.service';


@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent {

    public selectedBook: Book = null;

    constructor(private router: Router, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private spinner: NgxSpinnerService, private toastr: ToastrService,
                private userDetailsService: UserDetailsService, private userSesion: UserSessionService) {
        if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.book) {
            this.selectedBook = this.router.getCurrentNavigation().extras.state.book;
        }
    }

    public get canBorrowBook(): boolean {
        return (this.userDetailsService.isPhysicalSubcription || this.userDetailsService.isFullSubcription) &&
            this.userDetailsService.currentBooks.length <= this.userSesion.user.totalBooks;       
    }

    public get canReadOnline(): boolean {
        return this.userDetailsService.isOnlineSubcription || this.userDetailsService.isFullSubcription
    }

    public get isFavourite(): boolean {
        return this.userDetailsService.isFavouriteBook(this.selectedBook);
    }

    //#region events
    public onRate(event: any): void {
        this.spinner.show();
        this._apiRequest.requst('POST', this._pathRequest.bookRating + '/' + this.selectedBook.id, event.newValue)
        .subscribe((rating: number) => {
            this.selectedBook.rating = rating;
            this.selectedBook.votes++;
            event.newValue = Math.floor(rating);
            event.starRating._value = Math.floor(rating);
            this.spinner.hide();
        }, error => {
            const msg: string = 'An error occured. Please try again.'
            this.spinner.hide();
            this.toastr.error(msg);
        });
    }

    public onAddToWishlist(): void {

    }

    public onBorrowBook(): void {
        
    }

    public onReadBook(): void {
        
    }

    //#endregion
}