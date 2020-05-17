import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Book } from 'src/app/models/book.model';
import { Observable } from 'rxjs';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import * as _ from "lodash";
import { PagesRouting } from 'src/app/shared/pages-routing.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Book> = null
  public obs: Observable<any>;

  constructor(private userDetailsService: UserDetailsService, private cdr: ChangeDetectorRef, private _pagesRouting: PagesRouting) { 
    if (this.userDetailsService.library && this.userDetailsService.library.length > 0) {
      this.instantiateNavigator();
    }
  }

  ngOnInit() {
  }

  private instantiateNavigator() {
    // this.cdr.detectChanges();
    this.dataSource = new MatTableDataSource<Book>(this.userDetailsService.library);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  public get canShowContent(): boolean {
    if (_.isNil(this.obs) || this.userDetailsService.library.length === 0 || _.isNil(this.dataSource)) {
      return false;
    } 
    return true;
  }

  public get books (): Book[] {
    return this.userDetailsService.library;
  }

   //#region events
   public onShowBookDetails(book: Book) {
    this._pagesRouting.BookPage(book);
  }
  //#endregion 

}
