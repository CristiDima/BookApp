import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Book } from 'src/app/models/book.model';
import { Observable } from 'rxjs';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import * as _ from "lodash";
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-online-books',
  templateUrl: './online-books.component.html',
  styleUrls: ['./online-books.component.scss']
})
export class OnlineBooksComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Book> = null
  public obs: Observable<any>;

  constructor(private userDetailsService: UserDetailsService, private cdr: ChangeDetectorRef, private _pagesRouting: PagesRouting,
              private _apiRequest: APIRequestService, private _pathRequest: PathRequestService, private spinner: NgxSpinnerService,
              private toastr: ToastrService, private userSesion: UserSessionService) { 
    if (this.userDetailsService.onlineBooks && this.userDetailsService.onlineBooks.length > 0) {
      this.instantiateNavigator();
    }
  }

  ngOnInit() {
  }
 
  private instantiateNavigator() {
    // this.cdr.detectChanges();
    this.dataSource = new MatTableDataSource<Book>(this.userDetailsService.onlineBooks);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  public get canShowContent(): boolean {
    if (_.isNil(this.obs) || this.userDetailsService.onlineBooks.length === 0 || _.isNil(this.dataSource)) {
      return false;
    } 
    return true;
  }

  public get books (): Book[] {
    return this.userDetailsService.onlineBooks;
  }

   //#region events
  public onReadBook(book: Book): void {
    this._pagesRouting.PdfViewerPage(book);
  }

   public onShowBookDetails(book: Book): void {
    this._pagesRouting.BookPage(book);
  }

  public onRemoveFromOnlineLibrary(book: Book): void {
    this.deleteFromOnlineRequest(book);
  }
  //#endregion 

   //#region requests
   private deleteFromOnlineRequest(book: Book) {
    this.spinner.show();
    const succesMsg: string = 'The book: `' + book.name +'` was removed from your online library';
    const errorMsg: string = 'An error occured. Please try again.'
    this._apiRequest.requst('DELETE', this._pathRequest.onlinePath + '/' + book.id, this.userSesion.user.id)
    .subscribe((responseData: Book) => {
        const index: number = this.userDetailsService.onlineBooks.indexOf(responseData);
        this.userDetailsService.onlineBooks.splice(index, 1);
        this.toastr.warning(succesMsg);
        this.spinner.hide();
    }, error => {
        this.toastr.error(errorMsg);
        this.spinner.hide();
    });
  }
  //#endregion

}
