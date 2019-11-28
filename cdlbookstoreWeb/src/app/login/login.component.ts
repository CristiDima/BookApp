import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from '../shared/pages-routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {

  protected signinForm: FormGroup = null;

  constructor(private _pagesRouting: PagesRouting) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
      })
    });
    this.signinForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  protected onSubmit() {
    console.log(this.signinForm);
    // this.signinForm.reset();
  }

  onCancel() {
    this.signinForm.reset();
  }

  onSignUpPage() {
    this._pagesRouting.SignUpPage();
  }

}
