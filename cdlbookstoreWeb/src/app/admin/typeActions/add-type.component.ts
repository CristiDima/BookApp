import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-addtype',
    templateUrl: './add-type.component.html',
    styleUrls: ['./add-type.component.scss']
  })
  export class AddTypeComponent implements OnInit {
    protected addTypeForm: FormGroup = null;
    protected isOnAddPageMode: boolean = true;
    protected isOnRemovePageMode: boolean = false;

    ngOnInit() {
        this.addTypeForm = new FormGroup({
            'type': new FormControl(null, [Validators.required]),
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
        this.addTypeForm.reset();
    }
  }