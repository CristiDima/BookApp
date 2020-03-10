import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-deletebook',
    templateUrl: './delete-book.component.html',
    styleUrls: ['./delete-book.component.scss']
  })
  export class DeleteBookComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteBookForm: FormGroup = null;
  
    constructor() {}
  
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
  }