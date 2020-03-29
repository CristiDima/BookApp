import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { Book } from 'src/app/models/book.model';

@Component({
    selector: 'app-delete-book',
    templateUrl: './delete-book.component.html',
    styleUrls: ['./delete-book.component.scss']
  })
  export class DeleteBookComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteBookForm: FormGroup = null;
    protected booksList: string[] = [];

    constructor(private _bookService: BookService, private _apiRequest: APIRequestService,
                private _pathRequest: PathRequestService) {
      this.getInitialData();
    }
  
    ngOnInit() {
      this.deleteBookForm = new FormGroup({
          'bookName': new FormControl(null, [Validators.required])
      });
      this.deleteBookForm.statusChanges.subscribe(
        (status) => console.log(status)
      );
    }

    private getInitialData(): void {
      this.booksList = this._bookService.booksName;
    }
  
    //region Events
    onChangeMode(): void {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit(): void {
      const bookName: string = this.deleteBookForm.value.bookName;
      const book: Book = this._bookService.getBookByName(bookName);
      this.deleteBookRequest(book)
    }
  
    onCancel(): void {
      this.deleteBookForm.reset();
    }
    //endregion
  
    //region Requests
    private getBooksRequest(): void {
      this._apiRequest.requst('GET', this._pathRequest.authorPath).subscribe((responseData: Book[]) => {
        this._bookService.books = responseData;
        this.getInitialData();
      });
    }

    private deleteBookRequest(book: Book): void {
      this._apiRequest.requst('DELETE', this._pathRequest.authorPath, book.id).subscribe((responseData: Book) => {
        this.deleteBookForm.reset();
        this.getBooksRequest();
      });
    }
    //endregion

  }