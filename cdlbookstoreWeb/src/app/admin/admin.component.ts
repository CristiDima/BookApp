import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from '../shared/pages-routing.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  protected isOnAddPageMode: boolean = true;
  protected isOnRemovePageMode: boolean = false;

  protected addbookForm: FormGroup = null;

  constructor(private _pagesRouting: PagesRouting) {}

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
    console.log(this.addbookForm);
    // this.signinForm.reset();
  }

  onCancel() {
    this.addbookForm.reset();
  }

  onChangeMode() {
    this.isOnAddPageMode  = !this.isOnAddPageMode;
    this.isOnRemovePageMode = !this.isOnRemovePageMode;
  }

}
