import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { Book } from 'src/app/models/book.model';
import { AuthorService as AuthorService } from 'src/app/shared/author.service';
import { Author } from 'src/app/models/author.model';
import { TypeService } from 'src/app/shared/type.service';

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
  
    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService,
                private _pathRequest: PathRequestService, private _bookTypeService: TypeService) {
      this.getInitialData();
    }
  
    ngOnInit() {
      
      this.addbookForm = new FormGroup({
        'bookData': new FormGroup({
          'bookname': new FormControl(null, [Validators.required]),
          'authorname': new FormControl(null, [Validators.required]),
          'type': new FormControl(null, [Validators.required]),
          'description': new FormControl(null, [Validators.required])
        })
      });
    }
  
    protected onSubmit() {
      const book: Book = new Book();
      book.name = this.addbookForm.value.bookData.bookname;
      book.description = this.addbookForm.value.bookData.description;
      this._apiRequest.requst('POST', this._pathRequest.bookPath, book);
      this.addbookForm.reset();
    }
  
    onCancel() {
      this.addbookForm.reset();
    }
  
    onChangeMode() {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    private getInitialData(): void {
      this.authorList = this._authorService.authorsName;
      this.typeList = this._bookTypeService.typesName;
    }
  }