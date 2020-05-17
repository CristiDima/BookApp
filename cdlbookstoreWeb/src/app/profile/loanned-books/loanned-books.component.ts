import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import * as _ from "lodash";
import { PagesRouting } from 'src/app/shared/pages-routing.service';

@Component({
  selector: 'app-loanned-books',
  templateUrl: './loanned-books.component.html',
  styleUrls: ['./loanned-books.component.scss']
})
export class LoannedBooksComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Book> = null
  public obs: Observable<any>;

  constructor(private userDetailsService: UserDetailsService, private cdr: ChangeDetectorRef, private _pagesRouting: PagesRouting) {
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
   public onShowBookDetails(book: Book) {
    this._pagesRouting.BookPage(book);
  }
  //#endregion 

}
