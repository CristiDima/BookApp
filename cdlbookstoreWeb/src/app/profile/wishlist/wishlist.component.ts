import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Book } from 'src/app/models/book.model';
import { Observable } from 'rxjs';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import * as _ from "lodash";
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserSessionService } from 'src/app/shared/user-session.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Book> = null
  public obs: Observable<any>;

  constructor(private userDetailsService: UserDetailsService, private cdr: ChangeDetectorRef, private _pagesRouting: PagesRouting,
              private _apiRequest: APIRequestService, private _pathRequest: PathRequestService, private spinner: NgxSpinnerService,
              private toastr: ToastrService, private userSesion: UserSessionService) { 
    if (this.userDetailsService.wishlist && this.userDetailsService.wishlist.length > 0) {
      this.instantiateNavigator();
    }
  }

  ngOnInit() {
  }

  private instantiateNavigator() {
   
    this.dataSource = new MatTableDataSource<Book>(this.userDetailsService.wishlist);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    //  this.cdr.detectChanges();
  }

  public get canShowContent(): boolean {
    if (_.isNil(this.obs) || this.userDetailsService.wishlist.length === 0 || _.isNil(this.dataSource)) {
      return false;
    } 
    return true;
  }

  public get books (): Book[] {
    return this.userDetailsService.wishlist;
  }

  //#region events
  public onShowBookDetails(book: Book) {
    this._pagesRouting.BookPage(book);
  }

  public onRemoveFromWishlist(book: Book) {
    this.deleteFromWishlistRequest(book);
  }
  //#endregion 

  //#region requests
  private deleteFromWishlistRequest(book: Book) {
    this.spinner.show();
    const succesMsg: string = 'The book: `' + book.name +'` was removed from your wishlist';
    const errorMsg: string = 'An error occured. Please try again.'
    this._apiRequest.requst('DELETE', this._pathRequest.wishlistPath + '/' + book.id, this.userSesion.user.id)
    .subscribe((responseData: Book) => {
        const index: number = this.userDetailsService.wishlist.indexOf(responseData);
        this.userDetailsService.wishlist.splice(index, 1);
        this.toastr.warning(succesMsg);
        this.spinner.hide();
    }, error => {
        this.toastr.error(errorMsg);
        this.spinner.hide();
    });
  }
  //#endregion

}
