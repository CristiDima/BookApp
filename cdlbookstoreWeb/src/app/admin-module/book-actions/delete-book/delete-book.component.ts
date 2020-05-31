import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { Book } from 'src/app/models/book.model';
import { FileSaveService } from 'src/app/shared/file-save.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

@Component({
    selector: 'app-delete-book',
    templateUrl: './delete-book.component.html',
    styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {

    protected deleteBookForm: FormGroup = null;

    public bookControl: FormControl = new FormControl(null, [Validators.required]);
    public filteredBook: Observable<Book[]>;
    private selectedBook: Book;

    constructor(private bookService: BookService, private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private fileSaveService: FileSaveService, private spinner: NgxSpinnerService, private apiMessage: APIMessagesService) {
    }

    ngOnInit() {
      this.onResetForm();
      this.setFilters();
    }

    public get booksList(): string[] {
      return this.bookService.booksName;
    }

    public get canSubmit(): boolean {
      return !_.isNil(this.selectedBook);
    }

    //#region Events
    protected onSubmit(): void {
      this.deleteBookRequest(this.selectedBook);
    }

    public onCancel(): void {
      this.deleteBookForm.reset();
    }

    private onResetForm(): void {
      this.deleteBookForm = new FormGroup({
        bookName: this.bookControl
      });
      this.bookControl = new FormControl(null, [Validators.required]);
      this.setFilters();
    }
    //#endregion

    //#region Requests
    private deleteBookRequest(book: Book): void {
      this.spinner.show();
      this.apiRequest.requst('DELETE', this.pathRequest.bookPath, book.id).subscribe((responseData: Book) => {
        this.onResetForm();
        if (book.photo) {
          this.fileSaveService.deleteFile(book.photo);
        }
        if (book.file) {
          this.fileSaveService.deleteFile(book.file);
        }
        const index: number = this.bookService.books.findIndex(el => el.name === responseData.name);
        this.bookService.books.splice(index, 1);
        this.spinner.hide();
        this.apiMessage.onDeleteBookMsg(book);
      }, error => {
        this.spinner.hide();
        this.apiMessage.onDeleteBookMsg(error, true);
      });
    }
    //#endregion

    //#region filters
    private filterBook(value: string): Book[] {
      if (_.isNil(value)) {
        return;
      }
      const filterValue = value.toLowerCase();
      if (this.bookService.hasValueByName(value)) {
          this.selectedBook = this.bookService.books.filter(option => option.name.toLowerCase().includes(filterValue))[0];
          if (_.isNil(this.selectedBook.quiz)) {
          }
      } else {
        this.selectedBook = undefined;
      }
      return this.bookService.books.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    private setFilters(): void {
      this.filteredBook = this.bookControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filterBook(value))
      );
    }
    //#endregion
}
