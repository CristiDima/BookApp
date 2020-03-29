import { Component } from '@angular/core';
import { PathRequestService } from '../shared/path-request.service';
import { AuthorService } from '../shared/author.service';
import { APIRequestService } from '../shared/api-request.service';
import { Author } from '../models/author.model';
import { BookService } from '../shared/book.service';
import { Book } from '../models/book.model';
import { Genre } from '../models/genre.model';
import { GenreService } from '../shared/genre.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public isBookAction: boolean = false;
  public isAuthorAction: boolean = false;
  public isGenreAction: boolean = false;

  constructor(private _authorService: AuthorService, private _bookService: BookService,
              private _apiRequest: APIRequestService,  private _pathRequest: PathRequestService,
              private _genreService: GenreService) {
    this.getInitialDataRequest();
  }

  //region Events
  public onChangeBookAction() {
    this.isBookAction = true;
    this.isAuthorAction = false;
    this.isGenreAction = false;
  }

  public onChangeAuthorAction() {
    this.isBookAction = false;
    this.isAuthorAction = true;
    this.isGenreAction = false;
  }

  public onChangeGenreAction() {
    this.isBookAction = false;
    this.isAuthorAction = false;
    this.isGenreAction = true;
  }
  //endregion

  //region Requests
  private getInitialDataRequest() {
    this._apiRequest.requst('GET', this._pathRequest.authorPath).subscribe((responseData: Author[]) => {
      this._authorService.authors = responseData;
    });
    this._apiRequest.requst('GET', this._pathRequest.bookPath).subscribe((responseData: Book[]) => {
      this._bookService.books = responseData;
    });
    this._apiRequest.requst('GET', this._pathRequest.genrePath).subscribe((responseData: Genre[]) => {
      this._genreService.genres = responseData;
    });
  }
  //endregion

}
