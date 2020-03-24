import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { Book } from 'src/app/models/book.model';
import { AuthorService as AuthorService } from 'src/app/shared/author.service';
import { TypeService } from 'src/app/shared/type.service';
import { BookService } from 'src/app/shared/book.service';

@Component({
    selector: 'app-addbook',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss']
  })
  export class AddBookComponent implements OnInit {
    protected isOnAddPageMode: boolean = true;
    protected isOnRemovePageMode: boolean = false;
  
    protected addbookForm: FormGroup = null;
    protected typeList: string[] = [];
    protected authorList: string[] = [];
    protected authors: string[] = [];
    protected selectedAuthors = new FormControl([Validators.required]);
    protected selectedTypes = new FormControl([Validators.required]);
  
    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService,
                private _pathRequest: PathRequestService, private _bookTypeService: TypeService,
                private _bookService: BookService, public fb: FormBuilder) {
      this.getInitialData();
    }
  
    ngOnInit() {
      this.addbookForm = this.fb.group({
        'bookname': new FormControl(null, [Validators.required]),
        'authorsName': this.selectedAuthors,
        'typesArray': this.selectedTypes,
        'description': new FormControl(null, [Validators.required])
      });
    }
  
    protected onSubmit() {
      const book: Book = new Book();
      book.name = this.addbookForm.value.bookname;
      book.description = this.addbookForm.value.description;
      console.log(this.addbookForm.value);
      book.authorId = this._authorService.getAuthorByName(this.addbookForm.value.authorname).id;
      book.authorId = this._bookTypeService.getTypeByName(this.addbookForm.value.type).id;
      this._apiRequest.requst('POST', this._pathRequest.bookPath, book).subscribe((responseData: Book) => {
        this._bookService.books.push(responseData);
        this.addbookForm.reset();
      });
    }
  
    protected onCancel() {
      this.addbookForm.reset();
    }
  
    protected onChangeMode() {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    private getInitialData(): void {
      this.authorList = this._authorService.authorsName;
      this.typeList = this._bookTypeService.typesName;
    }
  }