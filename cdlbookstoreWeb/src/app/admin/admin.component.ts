import { Component } from '@angular/core';
import { PathRequestService } from '../shared/path-request.service';
import { AuthorService } from '../shared/author.service';
import { APIRequestService } from '../shared/api-request.service';
import { Author } from '../models/author.model';
import { BookService } from '../shared/book.service';
import { Book } from '../models/book.model';
import { BookType } from '../models/type.model';
import { TypeService } from '../shared/type.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public isBookAction: boolean = false;
  public isAuthorAction: boolean = false;
  public isTypeAction: boolean = false;

  constructor(private _authorService: AuthorService, private _bookService: BookService,
              private _apiRequest: APIRequestService,  private _pathRequest: PathRequestService,
              private _bookTypeService: TypeService) {
    this.onAPIResponse();
  }

  public onChangeBookAction() {
    this.isBookAction = true;
    this.isAuthorAction = false;
    this.isTypeAction = false;
  }

  public onChangeAuthorAction() {
    this.isBookAction = false;
    this.isAuthorAction = true;
    this.isTypeAction = false;
  }

  public onChangeTypeAction() {
    this.isBookAction = false;
    this.isAuthorAction = false;
    this.isTypeAction = true;
  }

  private onAPIResponse() {
    this._apiRequest.requst('GET', this._pathRequest.authorPath).subscribe((responseData: Author[]) => {
      this._authorService.authors = responseData;
    });
    this._apiRequest.requst('GET', this._pathRequest.bookPath).subscribe((responseData: Book[]) => {
      this._bookService.books = responseData;
    });
    this._apiRequest.requst('GET', this._pathRequest.bookTypePath).subscribe((responseData: BookType[]) => {
      this._bookTypeService.types = responseData;
    });
  }
}
