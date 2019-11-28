import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from '../shared/pages-routing.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  protected signupForm: FormGroup = null;

  constructor(private _pagesRouting: PagesRouting) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'firstname': new FormControl(null, [Validators.required]),
        'lastname': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'repeatPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      })
    });
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  protected onSave() {
    console.log(this.signupForm);
    this._pagesRouting.LoginPage();
    // this.signinForm.reset();
  }

  onCancel() {
    this.signupForm.reset();
    this._pagesRouting.HomePage();
  }

}
