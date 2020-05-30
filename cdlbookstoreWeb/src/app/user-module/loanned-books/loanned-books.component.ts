import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import * as _ from 'lodash';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { AuthorService } from 'src/app/shared/author.service';
import { GenreService } from 'src/app/shared/genre.service';
import { Author } from 'src/app/models/author.model';
import { Genre } from 'src/app/models/genre.model';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

@Component({
  selector: 'app-loanned-books',
  templateUrl: './loanned-books.component.html',
  styleUrls: ['./loanned-books.component.scss']
})
export class LoannedBooksComponent {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Book> = null;
  public obs: Observable<any>;

  constructor(private userDetailsService: UserDetailsService, private authorService: AuthorService, private genreService: GenreService,
              private pathRequest: PathRequestService,  private apiRequest: APIRequestService, private spinner: NgxSpinnerService,
              private userSesion: UserSessionService, private apiMessage: APIMessagesService) {
  }

  public canShowContent(): boolean {
    if (!this.books && this.books.length === 0) {
      return false;
    } else if (!this.authors && this.authors.length === 0) {
      return false;
    } else if (!this.genres && this.genres.length === 0) {
      return false;
    }

    return true;
  }

  public get authors(): Author[] {
    return this.authorService.authors;
  }

  public get genres(): Genre[] {
    return this.genreService.genres;
  }

  public get books(): Book[] {
    return this.userDetailsService.loanedBooks;
  }

   //#region events
  public onReturnBookRequest(book: Book): void {
    this.spinner.show();
    this.apiRequest.requst('POST', this.pathRequest.returnedPath + '/' + book.id, this.userSesion.user.id)
    .subscribe((responseData: Book) => {
        const index: number = this.userDetailsService.loanedBooks.indexOf(responseData);
        this.userDetailsService.loanedBooks.splice(index, 1);
        this.apiMessage.onReturnBookMsg(responseData);
        this.spinner.hide();
    }, error => {
        this.apiMessage.onReturnBookMsg(error, true);
        this.spinner.hide();
    });
  }
  //#endregion
}
