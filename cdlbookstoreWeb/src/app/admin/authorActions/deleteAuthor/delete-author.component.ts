import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-deleteauthor',
    templateUrl: './delete-author.component.html',
    styleUrls: ['./delete-author.component.scss']
  })
  export class DeleteAuthorComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteAuthorForm: FormGroup = null;
  
    constructor() {}
  
    ngOnInit() {
      this.deleteAuthorForm = new FormGroup({
        'authorData': new FormGroup({
          'authorname': new FormControl(null, [Validators.required]),
        })
      });
      this.deleteAuthorForm.statusChanges.subscribe(
        (status) => console.log(status)
      );
    }
  
    protected onSubmit() {
    }
  
    onCancel() {
      this.deleteAuthorForm.reset();
    }
  
    onChangeMode() {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }
  }