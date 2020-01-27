import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { Book } from 'src/app/models/book.model';

@Component({
    selector: 'app-addbook',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss']
  })
  export class AddBookComponent implements OnInit {
    protected isOnAddPageMode: boolean = true;
    protected isOnRemovePageMode: boolean = false;
  
    protected addbookForm: FormGroup = null;
    protected typeList: string[] = ['Drama', 'Personal Development']
  
    constructor(private _pagesRouting: PagesRouting, private _apiRequest: APIRequestService,
      private _pathRequest: PathRequestService) {}
  
    ngOnInit() {
      this.addbookForm = new FormGroup({
        'bookData': new FormGroup({
          'bookname': new FormControl(null, [Validators.required]),
          'authorname': new FormControl(null, [Validators.required]),
          'type': new FormControl(null, [Validators.required]),
          'description': new FormControl(null, [Validators.required])
        })
      });
      this.addbookForm.statusChanges.subscribe(
        (status) => console.log(status)
      );
    }
  
    protected onSubmit() {
      const book: Book = new Book();
      book.name = this.addbookForm.value.bookData.bookname;
      book.description = this.addbookForm.value.bookData.description;
      console.log(book);
      this._apiRequest.requst('POST', this._pathRequest.saveBookPath, book);
      // this.addbookForm.reset();
    }
  
    onCancel() {
      this.addbookForm.reset();
    }
  
    onChangeMode() {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }
  }