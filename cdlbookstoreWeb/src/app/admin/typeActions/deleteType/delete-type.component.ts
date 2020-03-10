import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-deletetype',
    templateUrl: './delete-type.component.html',
    styleUrls: ['./delete-type.component.scss']
  })
  export class DeleteTypeComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteTypeForm: FormGroup = null;
  
    constructor() {}
  
    ngOnInit() {
      this.deleteTypeForm = new FormGroup({
        'typeData': new FormGroup({
          'typename': new FormControl(null, [Validators.required]),
        })
      });
      this.deleteTypeForm.statusChanges.subscribe(
        (status) => console.log(status)
      );
    }
  
    protected onSubmit() {
    }
  
    onCancel() {
      this.deleteTypeForm.reset();
    }
  
    onChangeMode() {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }
  }