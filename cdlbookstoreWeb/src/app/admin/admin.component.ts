import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from '../shared/pages-routing.service';
import { APIRequestService } from '../shared/api-request.service';
import { PathRequestService } from '../shared/path-request.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

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
