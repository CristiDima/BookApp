import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesRouting } from '../shared/pages-routing.service';
import { APIRequestService } from '../shared/api-request.service';
import { UserCredentials } from '../models/user.model';
import {Md5} from "md5-typescript";
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {

  protected signinForm: FormGroup = null;
  

  constructor(private _pagesRouting: PagesRouting, private apiRequest: APIRequestService,
     private _authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
        'email': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
    });
  }


  //region events
  protected onSubmit() {
    const userCredentials: UserCredentials = new UserCredentials();
    userCredentials.username = this.signinForm.value.email;
    userCredentials.password = Md5.init(this.signinForm.value.password);
    this._authenticationService.login(userCredentials);
  }

  protected onCancel() {
    this.signinForm.reset();
  }

  protected onSignUpPage() {
    this._pagesRouting.SignUpPage();
  }

  protected onResetPasswordPage() {
    this._pagesRouting.ResetPasswordPage();
  }
  //endregion

}
