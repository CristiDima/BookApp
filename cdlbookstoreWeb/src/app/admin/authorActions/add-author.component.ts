import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-addauthor',
    templateUrl: './add-author.component.html',
    styleUrls: ['./add-author.component.scss']
  })
  export class AddAuthorComponent implements OnInit {
    protected addAuthorForm: FormGroup = null;
    protected isOnAddPageMode: boolean = true;
    protected isOnRemovePageMode: boolean = false;

    ngOnInit() {
        this.addAuthorForm = new FormGroup({
            'authorname': new FormControl(null, [Validators.required]),
            'description': new FormControl(null, [Validators.required])
        });
    }

    protected onChangeMode() {
        this.isOnAddPageMode  = !this.isOnAddPageMode;
        this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit() {
    }
    
    protected onCancel() {
        this.addAuthorForm.reset();
    }
  }