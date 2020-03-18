import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/shared/author.service';
import { BookService } from 'src/app/shared/book.service';

@Component({
    selector: 'app-deletebook',
    templateUrl: './delete-book.component.html',
    styleUrls: ['./delete-book.component.scss']
  })
  export class DeleteBookComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteBookForm: FormGroup = null;
    protected booksList: string[] = [];

    constructor(private _bookService: BookService) {
      this.getInitialData();
    }
  
    ngOnInit() {
      this.deleteBookForm = new FormGroup({
        'bookData': new FormGroup({
          'bookname': new FormControl(null, [Validators.required]),
        })
      });
      this.deleteBookForm.statusChanges.subscribe(
        (status) => console.log(status)
      );
    }
  
    protected onSubmit() {
    }
  
    onCancel() {
      this.deleteBookForm.reset();
    }
  
    onChangeMode() {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    private getInitialData(): void {
      this.booksList = this._bookService.booksName;
    }
  }