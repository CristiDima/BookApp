import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, FormGroupDirective } from '@angular/forms';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { Book } from 'src/app/models/book.model';
import { AuthorService as AuthorService } from 'src/app/shared/author.service';
import { GenreService } from 'src/app/shared/genre.service';
import { BookService } from 'src/app/shared/book.service';
import { Author } from 'src/app/models/author.model';
import { Genre } from 'src/app/models/genre.model';

@Component({
    selector: 'app-add-book',
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
    protected hasValue: boolean = false;
  
    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService,
                private _pathRequest: PathRequestService, private _genreService: GenreService,
                private _bookService: BookService, public fb: FormBuilder) {
      this.getInitialData();
    }
  
    ngOnInit() {
      this.addbookForm = this.fb.group({
        'bookname': new FormControl('', [Validators.required]),
        'authorsName': this.selectedAuthors,
        'typesArray': this.selectedTypes,
        'description': new FormControl('', [Validators.required])
      });
    }

    private getInitialData(): void {
      this.authorList = this._authorService.authorsName;
      this.typeList = this._genreService.genresName;
    }
  
    //region Events
    protected onChangeMode():void {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit(form: FormGroupDirective): void {
      const book: Book = new Book();
      book.name = this.addbookForm.value.bookname;
      book.description = this.addbookForm.value.description;

      this.addbookForm.value.authorsName.forEach(element => {
        const author: Author = this._authorService.getAuthorByName(element);
        book.authors.push(author);
      });
      this.addbookForm.value.typesArray.forEach(element => {
        const type: Genre = this._genreService.getGenreByName(element);
        book.genres.push(type);
      });
      if (!book || this._bookService.hasValue(book)) {
        this.addbookForm.controls['bookname'].setErrors({'incorrect': true});
        this.hasValue = true;
      } else {
        this.hasValue = false;
        this.addBookRequest(book);
      }
    }
  
    protected onCancel(): void {
      this.addbookForm.reset();
    }
    //endregion

    //region Requests
    private getBooksRequest(): void {
      this._apiRequest.requst('GET', this._pathRequest.bookPath).subscribe((responseData: Book[]) => {
        this._bookService.books = responseData;
      });
    }

    private addBookRequest(book: Book): void {
      this._apiRequest.requst('POST', this._pathRequest.bookPath, book).subscribe((responseData: Book) => {
        this.getBooksRequest();
        this.addbookForm.reset();
      });
    }
    //endregion
    
  }