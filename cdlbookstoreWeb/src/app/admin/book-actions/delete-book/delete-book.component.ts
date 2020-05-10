import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { Book } from 'src/app/models/book.model';
import { FileSaveService } from 'src/app/shared/file-save.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-delete-book',
    templateUrl: './delete-book.component.html',
    styleUrls: ['./delete-book.component.scss']
  })
  export class DeleteBookComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteBookForm: FormGroup = null;

    constructor(private _bookService: BookService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private fileSaveService: FileSaveService, private spinner: NgxSpinnerService,  private toastr: ToastrService) {
    }
  
    ngOnInit() {
      this.onResetForm();
    }

    public get booksList(): string[] {
      return this._bookService.booksName;
    }
  
    //region Events
    public onChangeMode(): void {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit(): void {
      const bookName: string = this.deleteBookForm.value.bookName;
      const book: Book = this._bookService.getBookByName(bookName);
      this.deleteBookRequest(book)
    }
  
    public onCancel(): void {
      this.deleteBookForm.reset();
    }

    private onResetForm(): void {
      this.deleteBookForm = new FormGroup({
        'bookName': new FormControl(null, [Validators.required])
      });
    }
    //endregion
  
    //region Requests
    private deleteBookRequest(book: Book): void {
      this.spinner.show();
      const succesMsg: string = 'The book: `' + book.name + '` was deleted';
      const errorMsg: string = 'An error occured. Please try again.'
      this._apiRequest.requst('DELETE', this._pathRequest.bookPath, book.id).subscribe((responseData: Book) => {
        this.onResetForm();
        if (book.photo) {
          this.fileSaveService.deleteFile(book.photo);
        }
        if (book.file) {
          this.fileSaveService.deleteFile(book.file);
        }
        const index: number = this._bookService.books.findIndex(el => el.name === responseData.name);
        this._bookService.books.splice(index, 1);
        this.spinner.hide();
        this.toastr.success(succesMsg);
      }, error => {
        this.spinner.hide();
        this.toastr.error(errorMsg);
      });
    }
    //endregion

  }