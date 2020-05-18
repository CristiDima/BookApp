import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import * as _ from "lodash";
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserSessionService } from 'src/app/shared/user-session.service';

@Component({
  selector: 'app-loanned-books',
  templateUrl: './loanned-books.component.html',
  styleUrls: ['./loanned-books.component.scss']
})
export class LoannedBooksComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Book> = null
  public obs: Observable<any>;

  constructor(private userDetailsService: UserDetailsService, private cdr: ChangeDetectorRef, private _pagesRouting: PagesRouting,
              private pathRequest: PathRequestService,  private apiRequest: APIRequestService, private spinner: NgxSpinnerService,
              private toastr: ToastrService, private userSesion: UserSessionService) {
    if (this.userDetailsService.loanedBooks && this.userDetailsService.loanedBooks.length > 0) {
      this.instantiateNavigator();
    }
    
   }

  ngOnInit() {
    
  }

  private instantiateNavigator() {
    this.dataSource = new MatTableDataSource<Book>(this.userDetailsService.loanedBooks);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    // this.cdr.detectChanges();
  }

  public get canShowContent(): boolean {
    if (_.isNil(this.obs) || this.userDetailsService.loanedBooks.length === 0 || _.isNil(this.dataSource)) {
      return false;
    } 
    return true;
  }


   //#region events
   public onShowBookDetails(book: Book): void {
    this._pagesRouting.BookPage(book);
  }

  public onReturn(book: Book): void {
    this.spinner.show();
        const succesMsg: string = 'A courier will be sent to your address to take: `' + book.name +'`';
        const errorMsg: string = 'An error occured. Please try again.'
        this.apiRequest.requst('POST', this.pathRequest.returnedPath + '/' + book.id, this.userSesion.user.id)
        .subscribe((responseData: Book) => {
            const index: number = this.userDetailsService.loanedBooks.indexOf(responseData);
            this.userDetailsService.loanedBooks.splice(index, 1);
            this.toastr.success(succesMsg);
            this.spinner.hide();
        }, error => {
            this.toastr.error(errorMsg);
            this.spinner.hide();
        });
  }
  //#endregion 

}
